"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.scss";

const VILLAGES = [
  "Agai","Aharbihar","Ainthi","Ajgra","Ajhara","Alawalpur","Alipur","Amawa","Amawan Khas","Amishankerpur",
  "Amrauna","Anehra","Antpur","Aoripur Naugir","Arjunpur","Arro","Asainapur","Asaon","Ashapur","Asrhi",
  "Atheha","Babhanpur","Babupur","Bachhwal","Badshahpur","Bahloolpur","Baijalpur","Balipur Bodawa","Balipur Katra",
  "Balipur Person","Bankati","Barahua","Barapur Bhikh","Baribojh","Basoya","Basuapur","Basupur","Batauli",
  "Belha","Benipur","Bewali","Bhabrahar","Bhadrikala","Bhagatpur","Bhagaura","Bhagdhara","Bhaisana","Bhatani",
  "Bhatni","Bhavram Bojhi","Bhawanigarh","Bhawanipur","Bhawari","Bhawn Ka Purwa","Bhemaura","Bhikhampur",
  "Bhikhipur","Bhimpur","Bhogapur","Bhojpur","Bhundaha","Bibipur","Bijoomau","Biliamgarh","Birbhadrapur",
  "Birsinghpur","Bojhwa","Buboopur","Budhiyapur","Chaemar Saraiya","Chahin","Chakodar","Chamrupur","Chandapur",
  "Chaturipur","Chichihara","Chitari","Daalatpur","Dabhiyar","Dagarara","Dalapatti","Dandi","Dandupur Padan",
  "Darehat","Darra","Daulatpur","Delhupur","Deoli","Deum Paschim","Deum Purab","Devigarh","Dewapur",
  "Dewapur Sakli","Dewari","Dhadhuwa Gajan","Dhansari","Dharupur","Dhaurahra","Dhigausi","Dhingwas",
  "Dhrushahpur","Dihhardo","Dihmehdi","Dinapur","Domipur","Dondpur","Dulhepur","Edilpur","Etaila",
  "Gadiyan","Gahri","Gajehari","Gajrahi","Garapur","Gazi Mahubavan","Gharaura","Ghuripur","Gobardhanpur",
  "Gokhari","Gondwa","Gopalpur","Gosainpur","Govind Naryanpur","Govindrasoolpur","Hadirahi","Haidarpur",
  "Handaur","Harakpurasaon","Hariherpur Kailha","Harmapur","Harrya","Harspur Kotwa","Hasanpur","Hernahar",
  "Hindupur","Hulasgarh","Husainpur","Itaora","Itauri","Jagannathpur","Jagdishpur","Jainpur","Jalalabad",
  "Jalilpur","Jamalpur","Jariyari","Jasmerha","Jethwara","Jewain","Jodhepur","Jogapur","Jugdishpur","Juhi",
  "Jurapur","Kachha","Kaira","Kaitha Dandi","Kajipur","Kalhwari","Kalikapur","Kalyanpur","Kamapatti",
  "Kamapursaraiya","Kambhit","Kanhaiya Dullapur","Kansapur","Karamchandrapur","Karmain","Katariya","Katehti",
  "Katra Sangramsingh","Katwao","Kaudhyadih","Kaushlyapur","Kavra","Kedaura","Keshvpur","Kethola",
  "Khairapure Chhemi","Khajuri","Khalsasadat","Khanapatti","Khandwa","Khanipur","Khaprahi","Kharagpur",
  "Khemsari","Kirat Pur","Kishungarh","Kothar Mangolepur","Kotwashukulpur","Kotya Newada","Kumbhapur",
  "Kumbhiaima","Kumbhidiha","Kundri","Kusauli","Kutilya Sanddei","Lakhahra","Lakhanpur Soor","Lakhansenpur",
  "Lakhapur","Lakuri","Lalupur","Laxmanpur","Lilapur","Lohangpur","Madamai","Madangarh Khas","Madhukarpur",
  "Madipur","Mahasinpur","Maheshpur","Mahimapur Khas","Mahmadpure Charpura","Majhgava","Majhwara",
  "Majre Chopsingh","Makhdumpur","Makra","Mangapur","Manipur","Maruhar","Masine","Mattupur Bhoji","Medapur",
  "Medhawan","Mishrainpur","Mishrpur","Misirpur","Mohanpur","Motin","Multanipur","Murainy","Mustafabad",
  "Nagapur","Nanautee","Nanhopur","Narayanpur","Narwal","Nasirpur","Naubasta","Naudhiya","Nauhadal Singh",
  "Nauhajaya","Nauhalaloo","Nauwanar","Neknampur","Newada Mustarka","Padmakerpur","Padnathpur","Paharpur",
  "Pandri","Paranipur","Paraspur","Parsurampur","Pathariya","Pati","Patti Kachehra","Patulki","Payagipur",
  "Pedariya","Phoolpur","Pichura","Pijari","Pipartali","Pithapur","Prataprudrapur","Puranpur Khajoor",
  "Puranpur Khas","Pure Anurudh","Pure Balbhadra","Pure Bansi","Pure Basantrai","Pure Bhadur","Pure Bhagmani",
  "Pure Bhagwat","Pure Bhattacharya","Pure Bhikhari","Pure Birbal","Pure Chaube","Pure Chhattu",
  "Puredhram Tulai","Pure Dinanath","Pure Fattesingh","Pure Gajai","Pure Gangaram","Pureghanshyam",
  "Pure Gopal Pandey","Pure Gosain","Puregoviwdrai","Pure Gulab Rai","Pure Harjoo","Pure Herkishun",
  "Pure Hiranand","Pure Ichharam","Pure Janai","Pure Jiwan","Pure Jodha","Pure Jora","Pure Karanrai",
  "Pure Keval","Pure Loka","Pure Matha","Pure Murli","Purenandan","Pure Naryandas","Pure Newaji Lal",
  "Pure Nirmal Girdhar","Pure Noti","Pure Paulha","Pure Ramchandra","Pure Rohniram","Pure Roop",
  "Pure Sadhoram","Pure Sewkram","Pure Shanker","Pure Shiva Vaishya","Pure Shyampur","Pure Tikaram",
  "Pure Tilakram","Pure Todar","Puretula Upadhyay","Pure Vasi","Purevijaisingh","Purewan","Purmai Sultanpur",
  "Purwara","Rabatpur","Ragauli","Raghuwapur","Rahatikar","Rahima Kuli","Raipur Khurd","Raipurtiyae",
  "Rajapur","Rajmatipur","Raki","Ramgarh","Ramgarhraila","Ramnagar Kol","Rampur","Rampur Bhaso",
  "Rampur Bhatani","Rampur Bheriyani","Rampur Kashiha","Rampur Kasiha","Rampur Khajoor","Rampur Khas",
  "Ranjeetpur","Ranjitgarh","Redi","Rehualalganj","Reoli","Ridhi","Rohara","Sagarpur","Sagra Sundarpur",
  "Saiyd Kasimpur","Salem Bhadari","Salhapur","Salwahanpur","Samapur","Samaspur","Sandwa Khas",
  "Sandwa Sombansian","Sangipur","Saona","Sarai Amma","Sarai Anadeo","Sarai Bagmani","Sarai Barmati",
  "Saraidalpat","Sarai Dasu","Saraideo Kunwar","Saraijagat Singh","Sarai Janmati","Sarai Lalmati",
  "Sarai Lalshah","Sarai Lohangrai","Sarai Makai","Sarai Naryansingh","Sarai Raijoo","Sarai Sangramsingh",
  "Sarai Sansara","Sarai Seten","Sarawan","Sarbajpur","Saripur","Sariyapur","Sarua","Semra","Shahbari",
  "Shahpur","Shakuhabad","Shitalmau","Shiv Bojh","Shivgarh Mitae","Shreepur","Shukulpur","Silaudhi",
  "Sindhaur","Singhgarh","Sirsa","Sohagpur","Sondwa Duban","Sonpur","Sujakhar","Sukhaupur","Tarapur",
  "Teliyahi","Tenda","Thriya","Tilauri","Tina","Todarpur","Turkiniya","Uchhapur","Udaipur","Udapur",
  "Udharanpur","Umapur","Umarpur","Umarura","Umrar","Upadhyapur","Usmanpur","Usra Patti",
];

type Step = "idle" | "mobile" | "success";

export default function Home() {
  const [selectedVillage, setSelectedVillage] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/count")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (step === "mobile") mobileRef.current?.focus();
  }, [step]);

  const handleRegisterClick = () => {
    if (!selectedVillage) {
      setError("Please select your village first.");
      return;
    }
    setError("");
    setStep("mobile");
  };

  const handleSubmit = async () => {
    if (!mobile || mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ village: selectedVillage, mobile }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStep("success");
      setCount((prev) => (prev !== null ? prev + 1 : null));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("idle");
    setSelectedVillage("");
    setMobile("");
    setError("");
  };

  return (
    <main className={styles.main}>
      {/* Background decoration */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgGrid} />

      {/* Floating food emojis */}
      <div className={styles.floatingItems} aria-hidden>
        {["🍱","🥘","🍛","🫕","🌶️","🍚","🥗","🫙"].map((emoji, i) => (
          <span key={i} className={styles.floatItem} style={{ "--i": i } as React.CSSProperties}>{emoji}</span>
        ))}
      </div>

      <div className={`container ${styles.wrapper}`}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <Image src="/logo.svg" alt="Lalganjeats" width={180} height={60} priority className={styles.logo} />
        </div>

        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Launching in Lalganj Soon
        </div>

        {/* Hero headline */}
        <h1 className={styles.headline}>
          <span className={styles.headlineTop}>आपके गाँव का</span>
          <span className={styles.headlineMain}>खाना</span>
          <span className={styles.headlineSub}>आपके दरवाज़े तक</span>
        </h1>

        <p className={styles.desc}>
          Authentic, homestyle meals from <strong>Lalganj's</strong> best kitchens —
          delivered fresh to your doorstep. Be among the first to know when we launch in your village.
        </p>

        {/* Stat */}
        {count !== null && count > 0 && (
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{count.toLocaleString()}</span>
              <span className={styles.statLabel}>villages registered</span>
            </div>
          </div>
        )}

        {/* Registration card */}
        <div className={styles.card}>
          {step === "success" ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>🎉</div>
              <h2 className={styles.successTitle}>You're on the list!</h2>
              <p className={styles.successText}>
                We'll notify you as soon as <strong>Lalganjeats</strong> launches in{" "}
                <strong>{selectedVillage}</strong>. Stay hungry!
              </p>
              <button className={`btn-primary ${styles.resetBtn}`} onClick={handleReset}>
                Register another village
              </button>
            </div>
          ) : step === "mobile" ? (
            <div className={styles.mobileStep}>
              <button className={styles.backBtn} onClick={() => setStep("idle")}>
                ← Back
              </button>
              <div className={styles.mobileVillage}>
                Registering for <strong>{selectedVillage}</strong>
              </div>
              <label className={styles.inputLabel}>Your Mobile Number</label>
              <div className={styles.mobileInputRow}>
                <span className={styles.mobilePrefix}>+91</span>
                <input
                  ref={mobileRef}
                  className={styles.mobileInput}
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
              <p className={styles.noOtp}>No OTP. No spam. Just a heads-up when we launch. 🤝</p>
              {error && <p className={styles.errorMsg}>{error}</p>}
              <button
                className={`btn-primary ${styles.submitBtn}`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <span className={styles.spinner} /> : "Confirm Registration →"}
              </button>
            </div>
          ) : (
            <div className={styles.idleStep}>
              <h2 className={styles.cardTitle}>Register your village</h2>
              <p className={styles.cardSubtitle}>
                Help us know where to launch first — villages with the most sign-ups get priority.
              </p>
              <div className={styles.selectWrap}>
                <span className={styles.selectIcon}>📍</span>
                <select
                  className={styles.villageSelect}
                  value={selectedVillage}
                  onChange={(e) => {
                    setSelectedVillage(e.target.value);
                    setError("");
                  }}
                >
                  <option value="">— Select your village —</option>
                  {VILLAGES.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <span className={styles.selectArrow}>▾</span>
              </div>
              {error && <p className={styles.errorMsg}>{error}</p>}
              <button className={`btn-primary ${styles.registerBtn}`} onClick={handleRegisterClick}>
                Register My Village 🚀
              </button>
            </div>
          )}
        </div>

        {/* Trust footer */}
        <div className={styles.trustRow}>
          <span>🔒 Your data is private</span>
          <span>·</span>
          <span>📲 No OTP required</span>
          <span>·</span>
          <span>❤️ Made in Lalganj</span>
        </div>

        <p className={styles.footerNote}>© 2026 Lalganjeats · lalganjeats.com</p>
      </div>
    </main>
  );
}
