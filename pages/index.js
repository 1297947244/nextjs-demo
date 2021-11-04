import { getJSON } from "../utils/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/home.module.scss";
import { useEffect, useCallback } from "react";
import Modal from "../components/modal";

const getStaticProps = async () => {
  const res = await getJSON(
    `https://api.gfycat.com/v1/gfycats/trending?count=20`
  );
  const result = res.gfycats
    .filter((i) => i.nsfw == "0")
    .map(({ gfyName, width, height }) => ({ id: gfyName, width, height }));
  return result;
};

const MOCK_PHOTO = [
  { id: "SnarlingCandidEsok", width: 540, height: 540 },
  { id: "SmartMellowKestrel", width: 1920, height: 1080 },
  { id: "LastingWiltedAuklet", width: 854, height: 478 },
  { id: "HollowFlawlessEuropeanpolecat", width: 720, height: 720 },
  { id: "PleasantImmediateGelding", width: 640, height: 640 },
  { id: "FastPracticalCanary", width: 640, height: 640 },
  { id: "DeliriousScrawnyCockatoo", width: 720, height: 720 },
  { id: "OrnateActualFossa", width: 1080, height: 1350 },
  { id: "HeavyWeeklyAdouri", width: 640, height: 360 },
  { id: "HighlevelComposedBluefintuna", width: 1334, height: 750 },
  { id: "BlankBabyishAcaciarat", width: 460, height: 484 },
  { id: "LittleImpeccableHairstreakbutterfly", width: 460, height: 574 },
  { id: "BewitchedOddballEasteuropeanshepherd", width: 406, height: 720 },
  { id: "DarkShortAfricanporcupine", width: 720, height: 880 },
  { id: "TediousRichDromaeosaur", width: 720, height: 976 },
  { id: "OrdinaryShimmeringAardvark", width: 756, height: 750 },
  { id: "CreamySkinnyArgali", width: 640, height: 1138 },
  { id: "SoupyGroundedCapeghostfrog", width: 1012, height: 1080 },
  { id: "NaiveGreenBackswimmer", width: 600, height: 542 },
  { id: "CreamyWiltedFlycatcher", width: 496, height: 720 },
];

export default function Home() {
  const router = useRouter();
  const { photoId } = router.query;
  const photos = MOCK_PHOTO;

  const onDismiss = useCallback(() => {
    if (photoId) router.back();
  }, [photoId, router]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <main className={styles.container}>
      <div>
        <h1>NextGram!!!!</h1>
      </div>
      {photoId && <Modal id={photoId} onDismiss={onDismiss} />}
      <div className={styles.images}>
        {photos.length > 0 &&
          photos.map(({ id, width, height }) => (
            <div key={id} className={styles.imageContainer}>
              <div key={id} className={styles.image}>
                <Link
                  href={{ pathname: "/", query: { photoId: id } }}
                  as={`/p/${encodeURI(id)}`}
                  shallow
                  scroll={false}
                >
                  <a>
                    <div className={styles.imageWrapper}>
                      <img
                        width={width}
                        height={height}
                        src={`https://thumbs.gfycat.com/${id}-mobile.jpg`}
                      />
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
