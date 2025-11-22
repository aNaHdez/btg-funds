# BTG Funds – Demo Frontend

Aplicación frontend para la prueba técnica de BTG, construida con **Angular 20 (standalone)**, **Supabase**, **PrimeNG**, **TailwindCSS** y una organización inspirada en **arquitectura hexagonal**.

Permite:

- Visualizar fondos disponibles.
- Suscribirse a un fondo (validando monto mínimo y saldo).
- Cancelar la suscripción en un fondo.
- Visualizar el historial de transacciones (suscripciones y cancelaciones).
- Seleccionar el método de notificación (EMAIL / SMS).
- Mostrar mensajes de error claros (saldo insuficiente, errores de backend, etc.).

---

## Tecnologías principales

- **Angular**: ^20.3.0 (standalone APIs, signals, lazy routes).
- **PrimeNG**: ^20.3.0 (Dialog, Table, Toast, Buttons, etc.).
- **PrimeIcons**: ^7.0.0
- **Supabase JS**: ^2.84.0
- **TailwindCSS**: ^3.4.15
- **TypeScript**: ~5.9.2
- **RxJS**: ^7.8.0

---

## Arquitectura

El proyecto sigue una organización inspirada en **arquitectura hexagonal**:

```text
src/
  app/
    core/
      domain/
        models/          # Entidades de dominio (Account, Fund, Transaction, Subscription)
        repositories/    # Interfaces (puertos) de acceso a datos
        errors/          # Errores de dominio (InsufficientBalanceError, etc.)
      application/
        use-cases/       # Casos de uso (SubscribeFund, CancelSubscription, GetFunds, etc.)
      infrastructure/
        supabase/        # Adaptadores a Supabase (repositorios concretos)
      state/
        account-store.service.ts
        fund-store.service.ts
        transaction-store.service.ts
        subscription-store.service.ts
    features/
      funds/             # Pantalla principal de fondos + diálogo de suscripción
      portfolio/         # Portafolio con suscripciones activas y cancelación
      transactions/      # Listado de transacciones
    shared/
      ui/                # Componentes UI reutilizables (layout, badge, tablas, etc.)
      pipes/             # Pipes compartidos (currencyCop)
    app.routes.ts        # Rutas con lazy loading
    app.config.ts        # Configuración global (PrimeNG, inyección de repositorios, router)
    app.ts               # Componente raíz standalone
  environments/
    environment.ts       # Configuración de Supabase (URL, anon key, demoAccountId)
```

### Capa `core/domain`

Define los modelos de dominio:

- `Account`, `Fund`, `Transaction`, `Subscription`
- Interfaces de repositorios:
  - `AccountRepository`
  - `FundRepository`
  - `TransactionRepository`
  - `SubscriptionRepository`
- Errores de dominio: `InsufficientBalanceError`.

### Capa `core/application`

Casos de uso principales:

- `GetAccountUseCase`
- `GetFundsUseCase`
- `GetTransactionsUseCase`
- `GetSubscriptionsUseCase`
- `SubscribeFundUseCase`
- `CancelSubscriptionUseCase`

Cada caso de uso opera sobre los puertos (`repositories`) y no conoce nada de Angular ni de Supabase.

### Capa `core/infrastructure/supabase`

Implementaciones concretas usando Supabase:

- `AccountRepositoryImpl`
- `FundRepositoryImpl`
- `TransactionRepositoryImpl`
- `SubscriptionRepositoryImpl`
- `SupabaseClientService` (cliente único configurado con `environment.supabaseUrl` y `environment.supabaseAnonKey`).

### Capa `state`

Stores simples basados en `BehaviorSubject` para exponer:

- Cuenta (`AccountStoreService`)
- Fondos (`FundStoreService`)
- Transacciones (`TransactionStoreService`)
- Suscripciones (`SubscriptionStoreService`)

Son consumidos por los componentes vía `Observable`.

### Capa `features`

- **Funds**: listado de fondos, selector de notificación, diálogo de suscripción.
- **Portfolio**: tabla de suscripciones activas, cancelación con confirmación y actualización de saldo.
- **Transactions**: historial de transacciones (SUBSCRIPTION / CANCELLATION).

### Capa `shared`

Componentes reutilizables:

- `LayoutShellComponent` (layout con header, menú y `<router-outlet>`).
- `BalanceBadgeComponent` (muestra saldo actualizado).
- `FundCardComponent`, `FundListComponent`.
- `NotificationSelectorComponent` (EMAIL / SMS).
- `TransactionTableComponent`.
- `CurrencyCopPipe` (formatea valores en COP con `Intl.NumberFormat`).

---

## Configuración de Supabase

La configuración se encuentra en:

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  supabaseUrl: 'https://TU-PROJECT.supabase.co',
  supabaseAnonKey: 'TU-ANON-KEY',
  demoAccountId: '11111111-1111-1111-1111-111111111111',
};
```

### Esquema y datos de ejemplo (seed)

Ejecutar en el proyecto de Supabase:

```sql
create table public.accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  balance numeric(14,2) not null
);

insert into public.accounts (id, name, balance)
values ('11111111-1111-1111-1111-111111111111', 'Usuario Demo BTG', 500000.00);

create table public.funds (
  id integer primary key,
  name text not null,
  min_amount numeric(14,2) not null,
  category text not null check (category in ('FPV', 'FIC'))
);

insert into public.funds (id, name, min_amount, category) values
(1, 'FPV_BTG_PACTUAL_RECAUDADORA', 75000.00, 'FPV'),
(2, 'FPV_BTG_PACTUAL_ECOPETROL', 125000.00, 'FPV'),
(3, 'DEUDAPRIVADA', 50000.00, 'FIC'),
(4, 'FDO-ACCIONES', 250000.00, 'FIC'),
(5, 'FPV_BTG_PACTUAL_DINAMICA', 100000.00, 'FPV');

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id),
  fund_id integer not null references public.funds(id),
  amount numeric(14,2) not null,
  created_at timestamptz not null default now()
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id),
  fund_id integer not null references public.funds(id),
  amount numeric(14,2) not null,
  type text not null check (type in ('SUBSCRIPTION', 'CANCELLATION')),
  notification_method text not null check (notification_method in ('EMAIL', 'SMS')),
  created_at timestamptz not null default now()
);
```

---

## Requisitos de entorno

- **Node.js**: 20.x recomendado
- **npm**: 10.x
- **Angular CLI**: 20.3.x

Instalar CLI (si no lo tienes):

```bash
npm install -g @angular/cli
```

---

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/aNaHdez/btg-funds.git
cd btg-funds
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar Supabase en `src/environments/environment.ts`  
   (URL, anon key y `demoAccountId`).

4. Ejecutar la aplicación en modo desarrollo:

```bash
npm start
# o
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200
```

---

## Scripts disponibles

- `npm start` – arranca `ng serve`.
- `npm run build` – construye la app para producción.
- `npm run test` – ejecuta pruebas unitarias con Karma / Jasmine.
- `npm run watch` – build en modo watch.

---

## Pruebas unitarias

Las pruebas unitarias se ejecutan con:

```bash
npm test
```

---

## Funcionalidad implementada vs requisitos

1. **Visualizar lista de fondos** – `FundsListPage` + `FundListComponent`.
2. **Suscribirse a un fondo** – diálogo de suscripción con validaciones y método de notificación.
3. **Cancelar suscripción en un fondo y ver saldo actualizado** – `PortfolioPage` + `CancelSubscriptionUseCase` + actualización de `AccountStore`.
4. **Visualizar historial de transacciones** – `TransactionsPage` + `TransactionTableComponent`.
5. **Seleccionar método de notificación (email / SMS)** – `NotificationSelectorComponent`.
6. **Mensajes de error apropiados** – toasts de PrimeNG para saldo insuficiente y errores generales.
