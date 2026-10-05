import { useMemo, useState, type ReactNode } from "react";

type Screen =
  | "p01"
  | "p02"
  | "p03"
  | "p04"
  | "p05"
  | "p06"
  | "p07"
  | "p08"
  | "p09"
  | "p10"
  | "p11"
  | "p12"
  | "p13"
  | "p14"
  | "p15"
  | "p16"
  | "p17"
  | "p18"
  | "p19"
  | "p20";

type IconName =
  | "arrow"
  | "back"
  | "bottle"
  | "camera"
  | "check"
  | "chevron"
  | "cup"
  | "fork"
  | "home"
  | "leaf"
  | "lock"
  | "mail"
  | "map"
  | "menu"
  | "profile"
  | "ranking"
  | "scan"
  | "spark"
  | "streak"
  | "sun"
  | "tote"
  | "upload";

const screenTitles: Partial<Record<Screen, string>> = {
  p02: "Verifica tu cuenta",
  p03: "Elige tu sede",
  p04: "Ingreso del personal",
  p06: "Dato ambiental",
  p07: "Mi reto",
  p08: "Escanear QR",
  p09: "Escribir código",
  p10: "¿Qué trajiste?",
  p11: "Foto opcional",
  p13: "Ranking",
  p14: "Cómo va cada sede",
  p15: "Mi perfil",
  p16: "Mi impacto",
  p17: "Mi huella",
  p18: "Panel de cafetería",
  p19: "Reporte de limpieza",
};

const challengeItems = [
  { id: "Botella reutilizable", icon: "bottle" as IconName, points: 20 },
  { id: "Taza", icon: "cup" as IconName, points: 15 },
  { id: "Táper", icon: "menu" as IconName, points: 25 },
  { id: "Cubiertos", icon: "fork" as IconName, points: 10 },
  { id: "Bolsa reutilizable", icon: "tote" as IconName, points: 15 },
];

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    back: <><path d="M19 12H5" /><path d="m10 17-5-5 5-5" /></>,
    bottle: <><path d="M9 3h6v4l2 3v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9l2-3Z" /><path d="M9 12h8" /></>,
    camera: <><path d="M14.5 5 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-2Z" /><circle cx="12" cy="13" r="3.5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    cup: <><path d="M6 7h11l-1 13H8Z" /><path d="M7 11h10" /><path d="M17 9h1a3 3 0 0 1 0 6h-1" /></>,
    fork: <><path d="M7 3v7" /><path d="M4 3v4a3 3 0 0 0 6 0V3" /><path d="M7 10v11" /><path d="M17 3v18" /><path d="M17 3c3 3 3 7 0 9" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    leaf: <><path d="M20 4C11 4 5 9 5 17c7 1 13-3 15-13Z" /><path d="M4 20c3-5 7-8 12-11" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
    menu: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
    profile: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    ranking: <><path d="M6 20V10h4v10M14 20V4h4v16M2 20h20" /></>,
    scan: <><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" /><rect x="8" y="8" width="8" height="8" rx="1" /></>,
    spark: <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5Z" />,
    streak: <path d="M13 2S6 8 8 14c-2-1-3-3-3-3-2 6 2 11 7 11s9-4 8-10c-1 2-3 3-3 3 1-5-4-9-4-13Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" /></>,
    tote: <><path d="M5 8h14l1 13H4Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    upload: <><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M4 15v5h16v-5" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Mascot({ mood = "happy", compact = false }: { mood?: "happy" | "celebrate"; compact?: boolean }) {
  return (
    <svg className={compact ? "mascot mascot--compact" : "mascot"} viewBox="0 0 180 190" role="img" aria-label="Reu, la mascota de ReUsa">
      {mood === "celebrate" && (
        <g className="confetti">
          <path d="M25 50 15 42M150 52l12-9M31 91l-14 4M150 92l15 5" />
          <circle cx="39" cy="27" r="4" />
          <circle cx="143" cy="27" r="4" />
        </g>
      )}
      <path className="leaf-shape" d="M105 28c5-16 18-21 31-17-2 16-14 25-31 17Z" />
      <path className="stem" d="M105 39c5-10 12-16 22-21" />
      <path className="lid" d="M47 48c0-8 7-14 15-14h57c8 0 15 6 15 14v9H47Z" />
      <path className="cup-shape" d="M51 57h79l-9 102c-1 11-10 19-21 19H80c-11 0-20-8-21-19Z" />
      <path className="cup-band" d="M56 91h69l-4 45H60Z" />
      <circle className="eye" cx="76" cy="78" r="4" />
      <circle className="eye" cx="105" cy="78" r="4" />
      <path className="smile" d="M80 85c5 7 15 7 21 0" />
      <path className="arm" d="M53 101c-13-1-19 5-22 13M127 100c13-1 20 6 22 14" />
      <path className="leg" d="M76 177v8M105 177v8" />
    </svg>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <button className="brand" onClick={onClick} aria-label="Ir al inicio">
      <span className="brand-mark"><Icon name="leaf" size={20} /></span>
      <span>ReUsa</span>
    </button>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  icon,
  type = "button",
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "light";
  icon?: IconName;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button className={`btn btn--${variant} ${className}`} type={type} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={20} />}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="back-button" onClick={onClick}>
      <Icon name="back" size={20} /> Volver
    </button>
  );
}

function ProgressSteps({ current }: { current: number }) {
  return (
    <div className="steps" aria-label={`Paso ${current} de 3`}>
      {[1, 2, 3].map((step) => <span key={step} className={step <= current ? "step active" : "step"} />)}
    </div>
  );
}

function StudentNav({ screen, go }: { screen: Screen; go: (screen: Screen) => void }) {
  const items = [
    { screen: "p05" as Screen, label: "Inicio", icon: "home" as IconName },
    { screen: "p13" as Screen, label: "Ranking", icon: "ranking" as IconName },
    { screen: "p15" as Screen, label: "Perfil", icon: "profile" as IconName },
  ];
  return (
    <>
      <header className="topbar">
        <Brand onClick={() => go("p05")} />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {items.map((item) => (
            <button key={item.screen} className={screen === item.screen ? "nav-link active" : "nav-link"} onClick={() => go(item.screen)}>
              {item.label}
            </button>
          ))}
        </nav>
        <button className="avatar-button" onClick={() => go("p15")} aria-label="Abrir perfil">LV</button>
      </header>
      <nav className="bottom-nav" aria-label="Navegación principal móvil">
        {items.map((item) => (
          <button key={item.screen} className={screen === item.screen ? "bottom-link active" : "bottom-link"} onClick={() => go(item.screen)}>
            <Icon name={item.icon} size={22} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

function AuthShell({ children, back, step }: { children: ReactNode; back: () => void; step?: number }) {
  return (
    <main className="auth-page">
      <div className="auth-top"><Brand onClick={() => back()} />{step && <ProgressSteps current={step} />}</div>
      <div className="auth-container">
        <BackButton onClick={back} />
        {children}
      </div>
    </main>
  );
}

function PageHeader({ title, eyebrow, action }: { title: string; eyebrow?: string; action?: ReactNode }) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
      </div>
      {action}
    </div>
  );
}

function Stat({ value, label, tone = "sage" }: { value: string; label: string; tone?: "sage" | "peach" | "cream" }) {
  return (
    <div className={`stat stat--${tone}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function QRCode() {
  return (
    <svg className="qr-code" viewBox="0 0 120 120" role="img" aria-label="Código QR del punto de registro">
      <rect className="qr-background" width="120" height="120" rx="8" />
      <g className="qr-pattern">
        <path d="M10 10h32v32H10Zm7 7v18h18V17ZM78 10h32v32H78Zm7 7v18h18V17ZM10 78h32v32H10Zm7 7v18h18V85Z" />
        <path d="M51 10h9v9h-9zM61 20h9v10h-9zM49 32h12v10H49zM67 45h10v10H67zM79 49h10v9H79zM95 48h15v10H95zM48 59h10v18H48zM62 60h9v9h-9zM74 64h18v10H74zM99 64h11v20H99zM47 82h10v10H47zM61 78h10v19H61zM76 82h9v9h-9zM88 77h10v12H88zM75 99h11v11H75zM90 94h20v16H90z" />
      </g>
    </svg>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("p01");
  const [staffRole, setStaffRole] = useState<"cafe" | "cleaning">("cafe");
  const [campus, setCampus] = useState("Monterrico");
  const [selectedItems, setSelectedItems] = useState<string[]>(["Botella reutilizable"]);
  const [rankTab, setRankTab] = useState("Mi sede");
  const [report, setReport] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [footprint, setFootprint] = useState({ cups: 3, bottles: 2, delivery: 2 });

  const points = useMemo(
    () => challengeItems.filter((item) => selectedItems.includes(item.id)).reduce((sum, item) => sum + item.points, 0),
    [selectedItems],
  );

  const go = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const studentScreens: Screen[] = ["p05", "p06", "p07", "p08", "p09", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17"];
  const showStudentNav = studentScreens.includes(screen);

  const toggleItem = (id: string) => {
    setSelectedItems((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <div className="app-shell">
      {showStudentNav && <StudentNav screen={screen} go={go} />}

      {screen === "p01" && (
        <main className="welcome-page">
          <header className="welcome-header"><Brand /></header>
          <section className="welcome-grid">
            <div className="welcome-copy">
              <span className="pill"><Icon name="spark" size={16} /> Reto Cero Descartables</span>
              <h1>Pequeños hábitos,<br /><em>un gran cambio.</em></h1>
              <p>Convierte tus decisiones cotidianas en un impacto real para tu campus y el planeta.</p>
              <div className="mascot-mobile"><Mascot compact /></div>
            </div>
            <div className="role-panel">
              <p className="eyebrow">Empecemos</p>
              <h2>¿Cómo participas en ReUsa?</h2>
              <div className="role-list">
                <button className="role-card role-card--featured" onClick={() => go("p02")}>
                  <span className="role-icon"><Icon name="profile" size={25} /></span>
                  <span><strong>Soy estudiante</strong><small>Completa retos, suma puntos y compite.</small></span>
                  <Icon name="arrow" />
                </button>
                <button className="role-card" onClick={() => { setStaffRole("cafe"); go("p04"); }}>
                  <span className="role-icon"><Icon name="cup" size={25} /></span>
                  <span><strong>Soy de una cafetería</strong><small>Gestiona tu punto de registro.</small></span>
                  <Icon name="chevron" />
                </button>
                <button className="role-card" onClick={() => { setStaffRole("cleaning"); go("p04"); }}>
                  <span className="role-icon"><Icon name="spark" size={25} /></span>
                  <span><strong>Soy personal de limpieza</strong><small>Reporta cómo va tu sede.</small></span>
                  <Icon name="chevron" />
                </button>
              </div>
              <p className="privacy-note"><Icon name="lock" size={16} /> Tus datos están seguros con nosotros.</p>
            </div>
            <div className="mascot-desktop"><Mascot /></div>
          </section>
        </main>
      )}

      {screen === "p02" && (
        <AuthShell back={() => go("p01")} step={1}>
          <div className="auth-card">
            <span className="auth-icon"><Icon name="mail" size={28} /></span>
            <p className="eyebrow">Cuenta de estudiante</p>
            <h1>Entra con tu correo UPC</h1>
            <p>Usaremos tu correo institucional para vincularte con tu sede y mantener tus logros seguros.</p>
            <label className="field">
              <span>Correo institucional</span>
              <div className="input-wrap"><Icon name="mail" size={20} /><input type="email" defaultValue="lucia.vargas" aria-label="Correo institucional" /><span>@upc.edu.pe</span></div>
            </label>
            <div className="code-section">
              <div><strong>Código de verificación</strong><small>Enviamos un código a tu correo</small></div>
              <div className="code-inputs">
                {["4", "8", "2", "6"].map((digit, index) => <input key={index} aria-label={`Dígito ${index + 1}`} maxLength={1} defaultValue={digit} />)}
              </div>
            </div>
            <Button onClick={() => go("p03")} icon="arrow">Continuar</Button>
            <button className="text-button">Reenviar código en 00:42</button>
          </div>
        </AuthShell>
      )}

      {screen === "p03" && (
        <AuthShell back={() => go("p02")} step={2}>
          <div className="auth-card auth-card--wide">
            <span className="auth-icon"><Icon name="map" size={28} /></span>
            <p className="eyebrow">Tu comunidad</p>
            <h1>¿Cuál es tu sede principal?</h1>
            <p>Así podrás ver el avance de tu campus y participar en su ranking.</p>
            <div className="campus-grid">
              {["Monterrico", "San Isidro", "Villa", "San Miguel"].map((name) => (
                <button key={name} className={campus === name ? "campus-card selected" : "campus-card"} onClick={() => setCampus(name)}>
                  <span className="campus-art"><Icon name="map" size={28} /></span>
                  <span><strong>Sede {name}</strong><small>Lima, Perú</small></span>
                  <span className="radio">{campus === name && <Icon name="check" size={15} />}</span>
                </button>
              ))}
            </div>
            <Button onClick={() => go("p05")} icon="arrow">Entrar a ReUsa</Button>
          </div>
        </AuthShell>
      )}

      {screen === "p04" && (
        <AuthShell back={() => go("p01")}>
          <div className="auth-card">
            <span className="auth-icon"><Icon name={staffRole === "cafe" ? "cup" : "spark"} size={28} /></span>
            <p className="eyebrow">{staffRole === "cafe" ? "Acceso cafetería" : "Acceso limpieza"}</p>
            <h1>Hola, qué gusto verte</h1>
            <p>Ingresa los datos asignados por el coordinador de tu sede.</p>
            <label className="field"><span>DNI</span><input type="text" inputMode="numeric" placeholder="8 dígitos" /></label>
            <label className="field"><span>Código de sede</span><input type="text" placeholder="Ej. UPC-M01" /></label>
            <Button onClick={() => go(staffRole === "cafe" ? "p18" : "p19")} icon="arrow">Ingresar</Button>
            <p className="helper">¿No tienes acceso? Contacta al coordinador de sostenibilidad de tu sede.</p>
          </div>
        </AuthShell>
      )}

      {screen === "p05" && (
        <main className="student-page">
          <PageHeader title="Buenos días, Lucía" eyebrow={`${campus} · Martes, 18 de junio`} action={<span className="weather"><Icon name="sun" /> 21° Lima</span>} />
          <section className="dashboard-grid">
            <article className="challenge-hero">
              <div className="challenge-copy">
                <span className="pill pill--light"><Icon name="streak" size={16} /> Racha de 6 días</span>
                <h2>Hoy también cuenta.</h2>
                <p>Registra un objeto reutilizable y mantén viva tu mejor racha.</p>
                <Button variant="light" onClick={() => go("p07")} icon="arrow">Continuar mi reto</Button>
              </div>
              <div className="streak-orbit"><strong>6</strong><span>días</span></div>
            </article>
            <article className="impact-card card">
              <div className="card-title"><span className="mini-icon"><Icon name="leaf" /></span><div><small>Este mes</small><h3>Tu impacto</h3></div></div>
              <strong className="big-number">1.8 kg</strong>
              <p>de residuos evitados</p>
              <div className="progress-bar"><span style={{ width: "72%" }} /></div>
              <button className="inline-link" onClick={() => go("p16")}>Ver mi impacto <Icon name="arrow" size={17} /></button>
            </article>
            <article className="news-card card">
              <div className="news-visual">
                <span>Dato de la semana</span>
                <Mascot compact />
              </div>
              <div className="news-copy">
                <h3>Una botella puede acompañarte por años</h3>
                <p>Usar una botella reutilizable evita hasta 167 botellas de plástico al año.</p>
                <button className="inline-link" onClick={() => go("p06")}>Leer más <Icon name="arrow" size={17} /></button>
              </div>
            </article>
            <article className="campus-status card">
              <div className="card-title"><span className="mini-icon peach"><Icon name="map" /></span><div><small>Sede {campus}</small><h3>Vamos mejorando</h3></div></div>
              <div className="status-row"><span className="status-symbol down">↓</span><div><strong>18% menos descartables</strong><small>frente a la semana pasada</small></div></div>
              <button className="inline-link" onClick={() => go("p14")}>Comparar sedes <Icon name="arrow" size={17} /></button>
            </article>
            <article className="rank-card card">
              <div><small>Tu posición semanal</small><strong>#24</strong><span>Subiste 7 lugares</span></div>
              <div className="rank-badge"><Icon name="ranking" size={30} /></div>
              <button className="inline-link" onClick={() => go("p13")}>Ver ranking <Icon name="arrow" size={17} /></button>
            </article>
            <button className="footprint-banner" onClick={() => go("p17")}>
              <span className="mini-icon"><Icon name="leaf" /></span>
              <span><strong>¿Conoces tu huella?</strong><small>Descúbrela en menos de 2 minutos</small></span>
              <Icon name="chevron" />
            </button>
          </section>
        </main>
      )}

      {screen === "p06" && (
        <main className="student-page narrow-page">
          <BackButton onClick={() => go("p05")} />
          <article className="article-page">
            <div className="article-hero"><span className="pill pill--light">Dato ambiental</span><Mascot /></div>
            <div className="article-body">
              <p className="eyebrow">5 min de lectura · ReUsa</p>
              <h1>Tu botella reutilizable es una pequeña heroína cotidiana</h1>
              <p className="lead">Una sola decisión repetida todos los días puede evitar cientos de envases de un solo uso.</p>
              <p>En promedio, una persona que compra agua embotellada con frecuencia puede consumir 167 botellas al año. Llevar la tuya reduce residuos y también la energía usada para fabricar y transportar cada envase.</p>
              <aside><strong>El dato clave</strong><span>Con 30 usos, una botella reutilizable comienza a compensar su impacto de fabricación.</span></aside>
              <h2>Hazlo fácil para ti</h2>
              <p>Déjala junto a tu mochila por la noche y recárgala en los puntos de agua de tu sede.</p>
              <div className="reaction-row"><span>¿Te sirvió este dato?</span>{["Me inspira", "Lo intentaré", "Ya lo hago"].map((text) => <button key={text}>{text}</button>)}</div>
            </div>
          </article>
        </main>
      )}

      {screen === "p07" && (
        <main className="student-page challenge-page">
          <BackButton onClick={() => go("p05")} />
          <div className="challenge-heading">
            <div><p className="eyebrow">Reto diario</p><h1>Tu racha está creciendo</h1><p>Cada registro suma. Hoy estás a un paso de llegar a una semana completa.</p></div>
            <div className="streak-medal"><Icon name="streak" size={36} /><strong>6</strong><span>días seguidos</span></div>
          </div>
          <section className="challenge-layout">
            <article className="daily-card">
              <div className="daily-top"><span className="pill"><Icon name="spark" size={16} /> Hoy</span><span>+ hasta 85 pts</span></div>
              <h2>Registra tu acción reutilizable</h2>
              <p>Escanea el código del punto ReUsa más cercano o escribe el código manual.</p>
              <div className="action-choice">
                <button onClick={() => go("p08")}><span className="choice-icon"><Icon name="scan" size={30} /></span><span><strong>Escanear código QR</strong><small>La opción más rápida</small></span><Icon name="arrow" /></button>
                <button onClick={() => go("p09")}><span className="choice-icon pale"><Icon name="menu" size={30} /></span><span><strong>Escribir código</strong><small>Si tu cámara no está disponible</small></span><Icon name="arrow" /></button>
              </div>
            </article>
            <aside className="week-card card">
              <h3>Esta semana</h3>
              <div className="week-days">{["L", "M", "M", "J", "V", "S", "D"].map((day, i) => <span key={i} className={i < 6 ? "done" : ""}>{i < 6 ? <Icon name="check" size={15} /> : day}</span>)}</div>
              <div className="week-progress"><span style={{ width: "86%" }} /></div>
              <p><strong>6 de 7 días.</strong> ¡Mañana desbloqueas la insignia “Una semana sin excusas”!</p>
            </aside>
          </section>
        </main>
      )}

      {screen === "p08" && (
        <main className="scan-page">
          <div className="scan-header"><BackButton onClick={() => go("p07")} /><Brand /></div>
          <div className="scan-content">
            <p className="eyebrow">Registro del reto</p><h1>Escanea el QR del punto</h1><p>Coloca el código dentro del recuadro. Lo reconoceremos automáticamente.</p>
            <div className="camera-view">
              <div className="camera-glow" />
              <div className="scan-frame"><span /><span /><span /><span /><div className="scan-line" /></div>
              <div className="camera-label"><Icon name="camera" size={18} /> Cámara activa</div>
            </div>
            <Button onClick={() => go("p10")} icon="scan">Simular escaneo</Button>
            <button className="text-button" onClick={() => go("p09")}>Prefiero escribir el código</button>
          </div>
        </main>
      )}

      {screen === "p09" && (
        <AuthShell back={() => go("p07")}>
          <div className="auth-card">
            <span className="auth-icon"><Icon name="menu" size={28} /></span>
            <p className="eyebrow">Alternativa al QR</p><h1>Escribe el código del punto</h1><p>Encontrarás los 4 dígitos debajo del código QR.</p>
            <div className="code-inputs code-inputs--large">
              {["1", "9", "4", "8"].map((digit, index) => <input key={index} aria-label={`Dígito ${index + 1}`} maxLength={1} defaultValue={digit} />)}
            </div>
            <div className="location-hint"><Icon name="map" /><span><strong>Cafetería principal</strong><small>Sede {campus} · Piso 1</small></span></div>
            <Button onClick={() => go("p10")} icon="arrow">Validar código</Button>
          </div>
        </AuthShell>
      )}

      {screen === "p10" && (
        <main className="flow-page">
          <div className="flow-top"><BackButton onClick={() => go("p07")} /><ProgressSteps current={1} /></div>
          <div className="flow-heading"><p className="eyebrow">Paso 1 de 3</p><h1>¿Qué trajiste hoy?</h1><p>Puedes elegir más de una opción. Cada objeto suma puntos distintos.</p></div>
          <div className="item-grid">
            {challengeItems.map((item) => (
              <button key={item.id} className={selectedItems.includes(item.id) ? "item-card selected" : "item-card"} onClick={() => toggleItem(item.id)} aria-pressed={selectedItems.includes(item.id)}>
                <span className="item-check">{selectedItems.includes(item.id) && <Icon name="check" size={17} />}</span>
                <span className="item-illustration"><Icon name={item.icon} size={38} /></span>
                <strong>{item.id}</strong><small>+{item.points} puntos</small>
              </button>
            ))}
          </div>
          <div className="sticky-action"><span><strong>{selectedItems.length} objetos</strong><small>+{points} puntos estimados</small></span><Button disabled={!selectedItems.length} onClick={() => go("p11")} icon="arrow">Continuar</Button></div>
        </main>
      )}

      {screen === "p11" && (
        <main className="flow-page">
          <div className="flow-top"><BackButton onClick={() => go("p10")} /><ProgressSteps current={2} /></div>
          <div className="photo-layout">
            <div className="flow-heading"><p className="eyebrow">Paso 2 de 3 · Opcional</p><h1>¿Quieres compartir una foto?</h1><p>Inspira a otros estudiantes mostrando cómo haces el cambio. Nunca publicaremos tu foto sin permiso.</p></div>
            <label className={photoName ? "upload-zone uploaded" : "upload-zone"}>
              <input type="file" accept="image/*" onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")} />
              <span className="upload-icon"><Icon name={photoName ? "check" : "upload"} size={32} /></span>
              <strong>{photoName || "Sube o toma una foto"}</strong>
              <small>{photoName ? "Imagen lista para tu registro" : "JPG o PNG · Máximo 8 MB"}</small>
              <span className="fake-button"><Icon name="camera" size={18} /> Elegir foto</span>
            </label>
          </div>
          <div className="sticky-action sticky-action--end"><button className="text-button" onClick={() => go("p12")}>Omitir por ahora</button><Button onClick={() => go("p12")} icon="arrow">{photoName ? "Usar esta foto" : "Continuar sin foto"}</Button></div>
        </main>
      )}

      {screen === "p12" && (
        <main className="success-page">
          <div className="success-burst"><Mascot mood="celebrate" /></div>
          <span className="pill"><Icon name="check" size={16} /> Registro confirmado</span>
          <h1>¡Lo hiciste, Lucía!</h1>
          <p>Tu acción de hoy ya está sumando al cambio de toda la comunidad UPC.</p>
          <div className="points-earned"><span>Ganaste</span><strong>+{points}</strong><span>puntos</span></div>
          <div className="success-stats">
            <Stat value="7 días" label="Nueva racha" tone="peach" />
            <Stat value="46 g" label="Residuos evitados" />
            <Stat value="#18" label="Ranking semanal" tone="cream" />
          </div>
          <div className="unlock-note"><Icon name="spark" /><span><strong>¡Nueva insignia desbloqueada!</strong><small>Una semana sin excusas</small></span></div>
          <Button onClick={() => go("p05")} icon="arrow">Volver al inicio</Button>
          <button className="text-button" onClick={() => go("p16")}>Ver mi impacto actualizado</button>
        </main>
      )}

      {screen === "p13" && (
        <main className="student-page">
          <PageHeader title="Ranking semanal" eyebrow="Comunidad ReUsa" action={<span className="period-chip">10–16 jun.</span>} />
          <div className="tabs">{["Mi sede", "Todas las sedes", "Amigos"].map((tab) => <button key={tab} className={rankTab === tab ? "active" : ""} onClick={() => setRankTab(tab)}>{tab}</button>)}</div>
          <section className="ranking-layout">
            <div className="podium-card card">
              <p className="eyebrow">Top de la semana</p>
              <div className="podium">
                <div className="podium-person second"><span className="person-avatar">DM</span><strong>Diego M.</strong><small>640 pts</small><i>2</i></div>
                <div className="podium-person first"><span className="crown"><Icon name="spark" /></span><span className="person-avatar">AS</span><strong>Ana S.</strong><small>780 pts</small><i>1</i></div>
                <div className="podium-person third"><span className="person-avatar">JM</span><strong>Joaquín M.</strong><small>590 pts</small><i>3</i></div>
              </div>
            </div>
            <div className="leader-list card">
              <div className="leader-head"><span>Posición</span><span>Estudiante</span><span>Puntos</span></div>
              {[
                ["4", "CP", "Camila P.", "545"],
                ["5", "FR", "Fabio R.", "510"],
                ["6", "VL", "Valeria L.", "480"],
                ["18", "LV", "Tú", "365"],
              ].map((row) => <div className={row[2] === "Tú" ? "leader-row me" : "leader-row"} key={row[0]}><strong>#{row[0]}</strong><span className="tiny-avatar">{row[1]}</span><span>{row[2]}</span><strong>{row[3]} pts</strong></div>)}
              <p className="encouragement"><Icon name="arrow" /> Estás a solo 18 puntos de subir un puesto.</p>
            </div>
          </section>
        </main>
      )}

      {screen === "p14" && (
        <main className="student-page">
          <BackButton onClick={() => go("p05")} />
          <PageHeader title="Cómo va cada sede" eyebrow="Reporte semanal · 10–16 junio" />
          <div className="legend"><span><i className="status-symbol down">↓</i> Menos descartables</span><span><i className="status-symbol same">=</i> Sin cambios</span><span><i className="status-symbol up">↑</i> Más descartables</span></div>
          <div className="campus-list">
            {[
              ["Monterrico", "↓", "18% menos", "1,284 acciones", "down"],
              ["Villa", "↓", "12% menos", "978 acciones", "down"],
              ["San Isidro", "=", "Se mantiene", "856 acciones", "same"],
              ["San Miguel", "↑", "6% más", "692 acciones", "up"],
            ].map(([name, symbol, result, actions, status], index) => (
              <article className={`campus-result ${index === 0 ? "featured" : ""}`} key={name}>
                <div className="campus-rank">0{index + 1}</div><div className={`status-symbol ${status}`}>{symbol}</div>
                <div><small>Sede</small><h2>{name}</h2></div><div className="campus-metric"><strong>{result}</strong><small>vs. semana anterior</small></div>
                <div className="campus-actions"><strong>{actions}</strong><small>registradas</small></div>
              </article>
            ))}
          </div>
          <div className="data-note"><Icon name="spark" /><span><strong>¿De dónde vienen estos datos?</strong><small>Combinamos los registros de estudiantes con los reportes rápidos del personal de limpieza.</small></span></div>
        </main>
      )}

      {screen === "p15" && (
        <main className="student-page">
          <PageHeader title="Mi perfil" eyebrow="Tu historia en ReUsa" action={<Button variant="secondary">Editar perfil</Button>} />
          <section className="profile-grid">
            <article className="profile-card card">
              <div className="profile-avatar">LV</div><h2>Lucía Vargas</h2><p>Comunicación y Marketing</p><span className="campus-tag"><Icon name="map" size={16} /> Sede {campus}</span>
              <div className="profile-stats"><div><strong>2,460</strong><span>puntos</span></div><div><strong>42</strong><span>acciones</span></div><div><strong>12</strong><span>mejor racha</span></div></div>
            </article>
            <article className="history-card card"><div className="card-title"><span className="mini-icon peach"><Icon name="streak" /></span><div><small>Racha histórica</small><h3>Tu constancia florece</h3></div></div><div className="history-chart">{[42, 68, 51, 77, 61, 88, 72, 94, 82, 100].map((height, i) => <span key={i} style={{ height: `${height}%` }} />)}</div><p>Tu mejor racha fue de <strong>12 días</strong> en mayo.</p></article>
            <article className="badges-card card"><div className="section-title"><div><p className="eyebrow">Colección</p><h2>Mis insignias</h2></div><span>6 de 12</span></div>
              <div className="badges-grid">
                {[["streak", "Primera chispa"], ["leaf", "Semana verde"], ["bottle", "Sin botella"], ["cup", "Café consciente"], ["spark", "Campus unido"], ["ranking", "Top 25"]].map(([icon, label]) => <div className="badge-item" key={label}><span><Icon name={icon as IconName} size={27} /></span><strong>{label}</strong></div>)}
              </div>
            </article>
            <button className="profile-link" onClick={() => go("p16")}><span className="mini-icon"><Icon name="leaf" /></span><span><strong>Mi impacto</strong><small>Explora todo lo que ya evitaste</small></span><Icon name="chevron" /></button>
            <button className="profile-link" onClick={() => go("p17")}><span className="mini-icon peach"><Icon name="spark" /></span><span><strong>Mi huella</strong><small>Calcula y reduce tu impacto</small></span><Icon name="chevron" /></button>
          </section>
        </main>
      )}

      {screen === "p16" && (
        <main className="student-page">
          <BackButton onClick={() => go("p15")} />
          <PageHeader title="Mi impacto" eyebrow="Desde que te uniste · 4 meses" />
          <section className="impact-dashboard">
            <article className="impact-total">
              <div><p className="eyebrow">Residuos que no llegaron al tacho</p><strong>4,820 <small>gramos</small></strong><p>Eso equivale al peso de <b>32 botellas llenas</b>.</p></div>
              <div className="impact-rings"><span className="ring ring-one" /><span className="ring ring-two" /><Icon name="leaf" size={48} /></div>
            </article>
            <Stat value="42" label="acciones registradas" />
            <Stat value="2,460" label="puntos ganados" tone="peach" />
            <Stat value="12 días" label="tu mejor racha" tone="cream" />
            <article className="equivalences card"><div className="section-title"><div><p className="eyebrow">Para imaginarlo mejor</p><h2>Tu impacto equivale a...</h2></div></div>
              <div className="equivalence-grid"><div><span><Icon name="bottle" size={30} /></span><strong>167</strong><p>botellas de plástico evitadas</p></div><div><span><Icon name="cup" size={30} /></span><strong>89</strong><p>vasos descartables menos</p></div><div><span><Icon name="leaf" size={30} /></span><strong>14.2 kg</strong><p>de CO₂ no emitidos</p></div></div>
            </article>
            <article className="monthly-chart card"><div className="section-title"><div><p className="eyebrow">Últimos 4 meses</p><h2>Sigues creciendo</h2></div><strong>+22% este mes</strong></div><div className="bar-chart">{[["Mar", 35], ["Abr", 54], ["May", 72], ["Jun", 94]].map(([month, value]) => <div key={month}><span style={{ height: `${value}%` }} /><small>{month}</small></div>)}</div></article>
          </section>
        </main>
      )}

      {screen === "p17" && (
        <main className="student-page">
          <BackButton onClick={() => go("p15")} />
          <PageHeader title="Conoce tu huella" eyebrow="Calculadora personal" />
          <section className="footprint-layout">
            <div className="calculator-card card">
              <h2>Cuéntanos sobre una semana normal</h2><p>Mueve los controles según tus hábitos. No hay respuestas buenas o malas.</p>
              {[
                ["Vasos descartables", "cups", footprint.cups, "cup"],
                ["Botellas de plástico", "bottles", footprint.bottles, "bottle"],
                ["Pedidos de comida", "delivery", footprint.delivery, "menu"],
              ].map(([label, key, value, icon]) => (
                <label className="range-field" key={String(key)}><span className="range-label"><span><Icon name={icon as IconName} />{label}</span><strong>{value} por semana</strong></span><input type="range" min="0" max="10" value={Number(value)} onChange={(e) => setFootprint({ ...footprint, [String(key)]: Number(e.target.value) })} /><span className="range-scale"><small>Nunca</small><small>10+</small></span></label>
              ))}
            </div>
            <aside className="footprint-result">
              <p className="eyebrow">Tu resultado estimado</p><div className="footprint-score"><strong>{(footprint.cups * 0.7 + footprint.bottles * 1.1 + footprint.delivery * 0.8).toFixed(1)}</strong><span>kg CO₂ / mes</span></div><h2>Vas por buen camino</h2><p>Tu huella por descartables es menor al promedio de estudiantes de tu sede.</p>
              <div className="recommendation"><Icon name="leaf" /><span><strong>Tu siguiente paso</strong><small>Lleva cubiertos reutilizables 2 veces por semana y reduce 0.4 kg más.</small></span></div>
              <Button onClick={() => go("p07")} variant="light" icon="arrow">Aceptar el reto</Button>
            </aside>
          </section>
        </main>
      )}

      {screen === "p18" && (
        <main className="staff-page">
          <header className="staff-header"><Brand onClick={() => go("p18")} /><div><span className="staff-tag">Cafetería</span><button className="avatar-button" onClick={() => go("p01")}>CM</button></div></header>
          <div className="staff-content">
            <PageHeader title="Punto Cafetería Central" eyebrow={`Sede ${campus} · Piso 1`} action={<span className="open-status"><i /> Punto activo</span>} />
            <section className="cafe-grid">
              <article className="qr-panel card"><div><p className="eyebrow">Código del punto</p><h2>Listo para escanear</h2><p>Los estudiantes registran su acción sin interrumpir la atención.</p></div><QRCode /><div className="code-label"><span>Código manual</span><strong>1948</strong></div><Button variant="secondary" icon="upload">Descargar para imprimir</Button></article>
              <div className="cafe-stats">
                <Stat value="86" label="registros hoy" />
                <Stat value="1,284" label="este mes" tone="peach" />
                <article className="peak-card card"><span className="mini-icon"><Icon name="ranking" /></span><div><small>Hora con más registros</small><strong>12:30 – 1:30 p. m.</strong></div></article>
              </div>
              <article className="activity-card card"><div className="section-title"><div><p className="eyebrow">Hoy</p><h2>Actividad reciente</h2></div><span>Actualizado ahora</span></div>
                {[["13:42", "Botella + táper", "+45 pts"], ["13:38", "Taza reutilizable", "+15 pts"], ["13:35", "Cubiertos", "+10 pts"], ["13:29", "Botella reutilizable", "+20 pts"]].map((item) => <div className="activity-row" key={item[0]}><span>{item[0]}</span><span className="activity-icon"><Icon name="check" size={16} /></span><strong>{item[1]}</strong><b>{item[2]}</b></div>)}
              </article>
            </section>
          </div>
        </main>
      )}

      {screen === "p19" && (
        <main className="report-page">
          <header><Brand /><button className="text-button" onClick={() => go("p01")}>Salir</button></header>
          <section className="report-card">
            <div className="report-progress"><span>Paso 1 de 1</span><div><i /></div></div>
            <p className="eyebrow">Reporte de hoy · Sede {campus}</p><h1>¿Cómo viste los descartables?</h1><p>Compara con un día habitual. Tu observación ayuda a medir el cambio real.</p>
            <div className="report-options">
              <button className={report === "less" ? "selected less" : ""} onClick={() => setReport("less")}><span className="report-symbol">↓</span><span><strong>Menos descartables</strong><small>Se notó una reducción</small></span><span className="radio">{report === "less" && <Icon name="check" size={16} />}</span></button>
              <button className={report === "same" ? "selected same" : ""} onClick={() => setReport("same")}><span className="report-symbol">=</span><span><strong>Igual</strong><small>Similar a otros días</small></span><span className="radio">{report === "same" && <Icon name="check" size={16} />}</span></button>
              <button className={report === "more" ? "selected more" : ""} onClick={() => setReport("more")}><span className="report-symbol">↑</span><span><strong>Más descartables</strong><small>Se notó un aumento</small></span><span className="radio">{report === "more" && <Icon name="check" size={16} />}</span></button>
            </div>
            <Button disabled={!report} onClick={() => go("p20")} icon="arrow">Enviar reporte</Button>
            <span className="report-time"><Icon name="spark" size={17} /> Te tomará menos de 20 segundos</span>
          </section>
        </main>
      )}

      {screen === "p20" && (
        <main className="report-page report-success">
          <header><Brand /></header>
          <section className="report-card">
            <div className="success-check"><Icon name="check" size={42} /></div>
            <p className="eyebrow">Reporte enviado</p><h1>¡Gracias por ayudarnos!</h1><p>Tu observación ya forma parte de los resultados de la sede {campus}.</p>
            <div className="report-summary"><span className={`status-symbol ${report === "less" ? "down" : report === "more" ? "up" : "same"}`}>{report === "less" ? "↓" : report === "more" ? "↑" : "="}</span><span><small>Tu reporte de hoy</small><strong>{report === "less" ? "Menos descartables" : report === "more" ? "Más descartables" : "Igual"}</strong></span></div>
            <div className="contribution-note"><Mascot compact /><span><strong>Tu mirada importa</strong><small>Junto con los registros de estudiantes, tu reporte nos permite saber si la sede realmente está reduciendo sus residuos.</small></span></div>
            <Button onClick={() => { setReport(""); go("p19"); }}>Finalizar</Button>
          </section>
        </main>
      )}

      {screenTitles[screen] && <div className="sr-only" aria-live="polite">{screenTitles[screen]}</div>}
    </div>
  );
}
