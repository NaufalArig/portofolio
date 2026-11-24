"use client";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

const ease = [0.2, 0.8, 0.2, 1] as const;

const rungs = [
  { a: "Laravel", b: "Next.js", coil: "Web developer", note: "Sistem administrasi TPQ, inventaris aset IT di PT. Yageo, aplikasi sewa barang, dan website PBL." },
  { a: "Windows", b: "Hardware", coil: "IT support", note: "Instalasi Windows dan perbaikan laptop, PC, dan tablet di PT. Epson dan PT. Yageo." },
  { a: "Keyence PLC", b: "IoT", coil: "Otomasi", note: "Belajar pemrograman PLC dan konveyor di PT. VARTA, serta alat IoT pemantau mangrove." },
];
const jobs = [
  { t: "Januari – Agustus 2026", r: "IT Support Intern", c: "PT. Yageo TMSS Indonesia", p: ["Membangun sistem inventaris aset IT berbasis web lokal dengan Laravel.", "Menangani laptop, PC, dan tablet Windows: pemecahan masalah perangkat keras dan instalasi Windows."] },
  { t: "Agustus – Desember 2025", r: "Information System Department Intern", c: "PT. Epson Batam", p: ["Menangani laptop, PC, dan tablet Windows: pemecahan masalah perangkat keras dan instalasi Windows.", "Berkontribusi pada proyek XIBO Digital Signage System."] },
  { t: "Agustus – November 2024", r: "Department Project Intern", c: "PT. VARTA Battery", p: ["Mempelajari pemrograman PLC Keyence dan membantu mentor membangun konveyor serta memprogram PLC.", "Membantu menelusuri masalah pemrograman pada mesin produksi."] },
];
type Project = { y: string; t: string; d: string; s: string[]; images?: { src: string; alt: string; label: string }[] };
const projects: Project[] = [
  { y: "2026", t: "Sistem Administrasi TPQ", d: "Proyek tugas akhir. Sistem administrasi TPQ berbasis web dengan manajemen santri dan guru, pengelolaan transaksi keuangan, kontrol akses berbasis peran, dan notifikasi.", s: ["Next.js", "Laravel"] },
  {
    y: "2025", t: "Leazone", d: "Aplikasi web penyewaan barang harian yang menghubungkan pemilik barang dengan penyewa. Pengguna dapat menjelajahi kategori dan rekomendasi barang, melihat detail serta ulasan, dan mengajukan penyewaan. Antarmuka dibangun dengan Next.js dan backend dikelola menggunakan Strapi.", s: ["Next.js", "Strapi"], images: [
      { src: "/projects/leazone-login.webp", alt: "Halaman login Leazone dengan formulir nama pengguna dan kata sandi", label: "Login" },
      { src: "/projects/leazone-dashboard.webp", alt: "Dashboard Leazone dengan kategori dan rekomendasi barang sewaan", label: "Dashboard" },
      { src: "/projects/leazone-detail.webp", alt: "Halaman detail barang Leazone dengan informasi produk, penyewaan, dan ulasan", label: "Detail barang" },
    ]
  },
  { y: "2024", t: "IOTROVE", d: "Alat IoT untuk memantau pertumbuhan dan kesehatan mangrove (masih dalam pengembangan).", s: ["IoT"] },
  {
    y: "2023", t: "AirSense", d: "Aplikasi mobile pemantauan kualitas udara yang menampilkan informasi kondisi udara berdasarkan lokasi, ringkasan cuaca, dan lokasi yang disimpan. Dibangun menggunakan Flutter dengan Firebase sebagai layanan database.", s: ["Flutter", "Firebase"], images: [
      { src: "/projects/airsense-home.webp", alt: "Tampilan beranda AirSense dengan prakiraan cuaca dan indeks kualitas udara", label: "Beranda" },
      { src: "/projects/airsense-maps.webp", alt: "Tampilan peta dan pencarian lokasi pada AirSense", label: "Peta lokasi" },
      { src: "/projects/airsense-login.webp", alt: "Tampilan halaman masuk AirSense", label: "Login" },
    ]
  },
  { y: "2022–23", t: "Website Laravel Full Stack", d: "Website untuk proyek PBL. Frontend dan backend memakai Laravel, termasuk pengelolaan basis data.", s: ["Laravel"] },
];
const skills = ["Laravel", "Next.js", "Flutter", "Strapi", "Keyence PLC", "XIBO", "Windows", "IoT", "Database"];

function Rail() {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <div className="rail" aria-hidden="true"><motion.i style={{ scaleY: s }} /></div>;
}

function DynamicIslandNav() {
  return (
    <div className="island-wrap">
      <motion.nav
        className="dynamic-island"
        aria-label="Navigasi utama"
        initial={{ y: -64, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <a href="#" className="island-brand">
          <i className="island-dot" aria-hidden="true" />
          <span>Portofolio</span>
        </a>
        <span className="island-divider" aria-hidden="true" />
        <div className="island-links">
          <a href="#pengalaman">Pengalaman</a>
          <a href="#proyek">Proyek</a>
          <a href="#keahlian">Keahlian</a>
          <a href="#kontak" className="island-cta">Kontak</a>
        </div>
      </motion.nav>
    </div>
  );
}

function Name() {
  const words = "Naufal Arig Dzaki Rendra Hariyanto".split(" ");
  let n = 0;
  return (
    <h1 aria-label={words.join(" ")}>
      {words.map((w) => (
        <span className="w" key={w} aria-hidden="true">
          {w.split("").map((c, j) => (
            <motion.span key={j} className="ch" initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ duration: 0.7, ease, delay: 0.03 * n++ }}>{c}</motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function Ladder() {
  const [on, setOn] = useState([true, true, true]);
  const [touched, setTouched] = useState(false);
  return (
    <>
      <div className="ladder">
        {rungs.map((r, i) => (
          <div className="rung" key={r.coil}>
            <div className="row">
              <span className="contact">{r.a}</span>
              <span className="contact">{r.b}</span>
              <span className="wire">
                <motion.span className="fill" initial={{ scaleX: 0 }} animate={{ scaleX: on[i] ? 1 : 0 }}
                  transition={{ duration: on[i] ? 0.9 : 0.35, ease: "easeInOut", delay: touched ? 0 : 0.9 + i * 0.9 }} />
              </span>
              <motion.button className={"coil" + (on[i] ? " on" : "")} aria-pressed={on[i]} whileTap={{ scale: 0.92 }}
                onClick={() => { setTouched(true); setOn(on.map((v, k) => (k === i ? !v : v))); }}>
                {r.coil}
              </motion.button>
            </div>
            <p className="note">{r.note}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const py = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <div className="pwrap">
      <motion.figure className="portrait" ref={ref} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
        onMouseLeave={() => { mx.set(0); my.set(0); }}>
        <motion.span className="frame" aria-hidden="true" initial={{ opacity: 0, x: 0, y: 0 }} animate={{ opacity: 1, x: 18, y: 18 }} transition={{ delay: 1.2, duration: 0.8, ease }} />
        <motion.div className="pic" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1.1, ease, delay: 0.2 }}>
          <motion.img src="/foto.webp" alt="Naufal Arig" width={760} height={1100} style={{ y: py }} initial={{ scale: 1.5 }} animate={{ scale: 1.16 }} transition={{ duration: 1.6, ease, delay: 0.2 }} />
        </motion.div>
        <motion.div className="chip" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: [0, -7, 0] }}
          transition={{ opacity: { delay: 1.5, duration: 0.5 }, y: { delay: 1.5, duration: 4, repeat: Infinity, ease: "easeInOut" } }}>
          <span className="lamp" aria-hidden="true" />Terbuka untuk posisi baru
        </motion.div>
      </motion.figure>
    </div>
  );
}

function Count({ to }: { to: number }) {
  const dec = Number.isInteger(to) ? 0 : 2;
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: setN });
    return () => c.stop();
  }, [seen, to]);
  return <span ref={ref}>{n.toFixed(dec).replace(".", ",")}</span>;
}

function H2({ children, id, num }: { children: ReactNode; id?: string; num?: string }) {
  return (
    <div className="sec-head">
      {num && (
        <motion.span
          className="sec-num"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease }}
        >
          {num}
        </motion.span>
      )}
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65, ease }}
      >
        {children}
      </motion.h2>
    </div>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const h = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  return (
    <div className="tlw" ref={ref}>
      <div className="tlline" aria-hidden="true"><motion.i style={{ scaleY: h }} /></div>
      <ol className="tl">
        {jobs.map((j) => (
          <li key={j.c}>
            <motion.span className="dot" aria-hidden="true" initial={{ scale: 0.5, backgroundColor: "rgba(242,169,0,0)" }}
              whileInView={{ scale: 1, backgroundColor: "rgba(242,169,0,1)" }} viewport={{ margin: "-35% 0px -45% 0px" }} />
            <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease }}>
              <time>{j.t}</time><h3>{j.r}</h3><p className="co">{j.c}</p>
              <ul>{j.p.map((x) => <li key={x} style={{ padding: 0 }}>{x}</li>)}</ul>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Projects() {
  const [open, setOpen] = useState(1);
  const [preview, setPreview] = useState<{ src: string; alt: string; label: string } | null>(null);
  return (
    <div>
      {projects.map((p, i) => {
        const o = open === i;
        return (
          <motion.div className="pj" key={p.t}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18, margin: "0px 0px -45px 0px" }}
            transition={{ duration: 0.65, ease }}>

            <button className="pjh" aria-expanded={o} aria-controls={`project-panel-${i}`} onClick={() => setOpen(o ? -1 : i)}>
              <span className="yr">{p.y}</span><h3>{p.t}</h3>
              <motion.span className="pl" aria-hidden="true" animate={{ rotate: o ? 45 : 0 }}>+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {o && (
                <motion.div id={`project-panel-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease }} style={{ overflow: "hidden" }}>
                  <div className="body">
                    <p className="project-description">{p.d}</p>
                    <div>{p.s.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                    {p.images && (
                      <div className={`project-gallery${p.t === "Leazone" ? " leazone-gallery" : ""}`} aria-label={`Screenshot ${p.t}`}>
                        {p.images.map((img, index) => (
                          <motion.button type="button" className="project-shot" key={img.src}
                            onClick={() => setPreview(img)}
                            initial={{ opacity: 0, y: 42, scale: 0.97 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65, ease, delay: index * 0.13 }}
                            whileHover={{ y: -7, scale: 1.015 }} whileTap={{ scale: 0.985 }}
                            aria-label={`Lihat screenshot ${img.label}`}>
                            <span className={`shot-image${p.t === "Leazone" ? " leazone-shot-image" : ""}`}><img src={img.src} alt={img.alt} loading="lazy" /></span>
                            <span className="shot-caption"><span>{String(index + 1).padStart(2, "0")}</span>{img.label}<span className="shot-zoom" aria-hidden="true">↗</span></span>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      <AnimatePresence>
        {preview && (
          <motion.div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`Preview ${preview.label}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreview(null)}>
            <motion.div className="lightbox-content" initial={{ y: 18, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 12, scale: 0.98 }} onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-bar"><span>{preview.label}</span><button type="button" onClick={() => setPreview(null)} aria-label="Tutup preview">×</button></div>
              <img src={preview.src} alt={preview.alt} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Mag({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.a href={href} className={className} style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.15); y.set((e.clientY - r.top - r.height / 2) * 0.3); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.a>
  );
}

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <Rail />
      <DynamicIslandNav />
      <div className="wrap">
        <header className="hero">
          <div className="hero-top"><div className="hero-text"><p className="kicker">Software developer dan IT support di Batam</p>
            <Name />
            <p className="lead">Lulusan D4 Teknologi Rekayasa Perangkat Lunak, Politeknik Negeri Batam. Saya membangun aplikasi web, merawat perangkat kerja di pabrik, dan belajar memprogram PLC. Tiga jalur itu ada di diagram di bawah.</p></div>
            <Portrait />
          </div>
          <Ladder />
          <div className="stat">
            <div><b><Count to={3.75} /></b>IPK D4</div>
            <div><b><Count to={3} /></b>Perusahaan magang</div>
            <div><b><Count to={5} /></b>Proyek akademik</div>
          </div>
        </header>
      </div>
      <div className="mq" aria-hidden="true"><div>{[...skills, ...skills].map((s, i) => <span key={i}>{s}</span>)}</div></div>
      <div className="wrap">
        <section id="pengalaman"><H2 num="01">Pengalaman Magang</H2><Timeline /></section>
        <section id="proyek"><H2 num="02">Proyek Akademik</H2><Projects /></section>
        <section id="keahlian"><H2 num="03">Keahlian dan Sertifikasi</H2>
          <div className="grid">
            <div><h3>Pengembangan</h3><p>Laravel, Flutter, Next.js, Strapi, pengembangan frontend dan backend, manajemen basis data.</p></div>
            <div><h3>IT support</h3><p>Pemecahan masalah perangkat keras, instalasi Windows, pemrograman PLC Keyence, XIBO.</p></div>
            <div><h3>Sertifikasi</h3>
              <a
                href="https://certifications.certnexus.com/87558c40-ab39-4c22-88a4-c383b1ebc450"
                target="_blank"
                rel="noopener noreferrer"
                className="cert-link"
                aria-label="Lihat sertifikat Fullstack Developer Associate (Logical Operations)"
              >
                <p className="cert"><b>Fullstack Developer Associate <span aria-hidden="true">↗</span></b>Logical Operations, Juli 2026</p>
              </a>
              <a
                href="https://drive.google.com/file/d/1mhX8AWOXNDvkuIzAjrCF2aon28JIGtGb/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="cert-link"
                aria-label="Lihat sertifikat Hertech: Berdaya AI (ICT Watch)"
              >
                <p className="cert"><b>Hertech: Berdaya AI <span aria-hidden="true">↗</span></b>ICT Watch, Juni 2026</p>
              </a>
            </div>
          </div>
        </section>
        <section id="kontak"><H2 num="04">Kontak</H2>
          <p style={{ maxWidth: "52ch", color: "var(--mut)", margin: "0 0 22px" }}>Terbuka untuk posisi software development dan IT support.</p>
          <Mag href="mailto:naufalarig16@gmail.com" className="cta">naufalarig16@gmail.com</Mag><br />
          <Mag href="https://wa.me/6287751784347" className="wa">Chat lewat WhatsApp</Mag>
          <div className="links" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 14 }}>
            <Mag href="https://github.com/NaufalArig" className="wa">GitHub</Mag>
            <Mag href="https://www.linkedin.com/in/rendra-dzaki/" className="wa">LinkedIn</Mag>
          </div>
        </section>
        <footer>© {new Date().getFullYear()} Naufal Arig Dzaki Rendra Hariyanto, S.Tr.Kom. Batam.</footer>
      </div>
    </MotionConfig>
  );
}