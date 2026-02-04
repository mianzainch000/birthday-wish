"use client";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const sisterName = "Hadia";
  const [cut, setCut] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [giftOpened, setGiftOpened] = useState(false);

  const audioRef = useRef(null);
  const giftRef = useRef(null); // 🎁 Gift section
  const messageRef = useRef(null); // 💌 Message card

  // 🎉 Confetti when cake is cut
  useEffect(() => {
    if (cut) {
      const interval = setInterval(() => {
        confetti({ particleCount: 80, spread: 160, origin: { y: 0.4 } });
      }, 500);
      setTimeout(() => clearInterval(interval), 4000);
    }
  }, [cut]);

  // 💌 Scroll message into view after gift opened
  useEffect(() => {
    if (giftOpened) {
      setTimeout(() => {
        messageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [giftOpened]);

  const startSurprise = () => setShowPopup(false);

  const cutCake = () => {
    setCut(true);
    setMusicOn(true);

    audioRef.current?.play().catch(() => { });
    confetti({ particleCount: 250, spread: 100, origin: { y: 0.5 } });

    // 🎁 Scroll to gift section
    setTimeout(() => {
      giftRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 600);
  };

  const toggleMusic = () => {
    if (musicOn) audioRef.current.pause();
    else audioRef.current.play();
    setMusicOn(!musicOn);
  };

  return (
    <div className={styles.container}>
      <audio ref={audioRef} loop>
        <source src="/birthday.mp3" type="audio/mpeg" />
      </audio>

      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>🎁 A Special Surprise!</h2>
            <p>Hadia, click below to start your birthday surprise! ✨</p>
            <button className={styles.btn} onClick={startSurprise}>
              Open Surprise ❤️
            </button>
          </div>
        </div>
      )}

      <h1 className={styles.title}>🎉 Happy Birthday {sisterName} 🎉</h1>

      <button
        className={`${styles.musicBtn} ${!cut ? styles.hidden : styles.visible
          }`}
        onClick={toggleMusic}
      >
        {musicOn ? "🔊 Music ON" : "🔇 Music OFF"}
      </button>

      <div className={styles.scene}>
        {!cut ? (
          <Image
            src="/girl-ready.png"
            alt="Ready"
            width={400}
            height={400}
            className={styles.fullImage}
            priority
          />
        ) : (
          <Image
            src="/girl-cutting.png"
            alt="Cutting"
            width={400}
            height={400}
            className={styles.fullImage}
          />
        )}
      </div>

      {!cut && (
        <button className={styles.btn} onClick={cutCake}>
          🎂 Cut the Cake 🎂
        </button>
      )}

      {/* 🎁 GIFT SECTION */}
      {cut && (
        <div className={styles.giftSection} ref={giftRef}>
          <p className={styles.afterText}>
            ✨ Wish granted! Allah meri pyari behna ki har dua poori kare 🎂💖
          </p>

          <div
            className={`${styles.giftBox} ${giftOpened ? styles.opened : ""}`}
            onClick={() => setGiftOpened(true)}
          >
            {!giftOpened ? (
              <div className={styles.giftClosed}>
                <div className={styles.giftEmoji}>🎁</div>
                <p className={styles.tapText}>Tap to see Gift from Zain!</p>
              </div>
            ) : (
              <div className={styles.giftContent}>
                <div className={styles.messageCard} ref={messageRef}>
                  <p>
                    Meri pyari behna <strong>{sisterName}</strong> ❤️
                    <br />
                    <br />
                    Allah tumhain hamesha khush rakhay, sehat aur kamyabi ata
                    kare (Ameen) 🤲
                    <br />
                    <br />
                    🎂 Happy Birthday 🎂
                  </p>
                  <div className={styles.fromBadge}>— Tumhara Bhai Zain 💫</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
