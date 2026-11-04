import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { Project, ProjectMedia } from "../../types";
import { GithubIcon, YoutubeIcon } from "../../icons";
import InfoList from "./InfoList";
import LinkArrow from "./LinkArrow";
import { ScrollHeadline, ScrollImage, ScrollText } from "./ScrollMotion";
import TiltCard from "./TiltCard";

interface Props {
  project: Project;
  reverse?: boolean;
}

function getYouTubeEmbedUrl(url: string) {
  if (url.includes("/embed/")) return url;

  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|live\/))([^&?/]+)/,
  );

  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function ProjectCard({ project, reverse = false }: Props) {
  const {
    title,
    description,
    tag,
    image,
    media,
    info,
    stack,
    liveUrl,
    codeUrl,
    youtubeUrl,
  } = project;

  const gallery: ProjectMedia[] = media?.length
    ? [...media]
    : image
      ? [{ type: "image", src: image, alt: title }]
      : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const activeMedia = gallery[activeIndex];

  const openLightbox = () => {
    setImageExpanded(true);

    // Start the transition after the lightbox has mounted.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLightboxVisible(true));
    });
  };

  const closeLightbox = () => {
    setLightboxVisible(false);
    window.setTimeout(() => setImageExpanded(false), 300);
  };
  // improvised
  useEffect(() => {
    if (!imageExpanded) return;

    const prevOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation(); // keep the project pop-up behind from closing too
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true); // capture: runs before the pop-up's own Esc handler
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = prevOverflow; // not '' : the pop-up still needs the page locked
    };
  }, [imageExpanded]);

  // Close the lightbox if the user selects another gallery item.
  const selectMedia = (index: number) => {
    setImageExpanded(false);
    setLightboxVisible(false);
    setActiveIndex(index);
  };

  return (
    <>
      <article
        className={`flex flex-col items-stretch gap-8 lg:items-start lg:gap-12 ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Gallery */}
        <div className="w-full min-w-0 lg:w-1/2 lg:flex-none">
          {/* card lift on hover; TiltCard keeps handling the 3D tilt inside */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <TiltCard className="relative overflow-hidden rounded-xl bg-card transition-shadow duration-500 hover:shadow-2xl">
              {tag && (
                <ScrollText
                  className="absolute left-4 top-4 z-10"
                  order={2}
                  y={14}
                >
                  <span className="block rounded-full bg-bg px-4 py-2 font-body text-sm font-medium">
                    {tag}
                  </span>
                </ScrollText>
              )}

              <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-card">
                {activeMedia?.type === "youtube" ? (
                  <iframe
                    src={getYouTubeEmbedUrl(activeMedia.src)}
                    title={activeMedia.alt || `${title} video`}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : activeMedia ? (
                  <ScrollImage className="absolute inset-0" parallax={false}>
                    <button
                      type="button"
                      onClick={openLightbox}
                      aria-label="Show full-size image"
                      className="absolute inset-0 h-full w-full cursor-zoom-in"
                    >
                      <img
                        src={activeMedia.src}
                        alt={activeMedia.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </button>
                  </ScrollImage>
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-sm text-muted">
                    Add project images to the media list
                  </div>
                )}
              </div>
            </TiltCard>
          </motion.div>

          {activeMedia && (
            <ScrollText order={3} y={14}>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                {activeMedia.caption && (
                  <p className="text-muted">{activeMedia.caption}</p>
                )}

                {activeMedia.type === "image" && (
                  <button
                    type="button"
                    onClick={openLightbox}
                    className="cursor-pointer text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
                  >
                    Click to show the full image
                  </button>
                )}
              </div>
            </ScrollText>
          )}

          {gallery.length > 1 && (
            <ScrollText order={4} y={14}>
              <div
                className="mt-3 flex flex-wrap gap-3"
                aria-label={`${title} media`}
              >
                {gallery.map((item, index) => (
                  <button
                    key={`${item.type}-${item.src}`}
                    type="button"
                    aria-label={`Show ${item.alt}`}
                    aria-pressed={activeIndex === index}
                    onClick={() => selectMedia(index)}
                    className={`relative h-16 w-20 overflow-hidden rounded-lg border-2 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                      activeIndex === index ? "border-accent" : "border-line"
                    }`}
                  >
                    {item.type === "youtube" ? (
                      <span className="grid h-full w-full place-items-center bg-card text-accent">
                        <YoutubeIcon className="h-6 w-6" />
                      </span>
                    ) : (
                      <img
                        src={item.src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </ScrollText>
          )}
        </div>

        {/* Project information: each block slides up in turn */}
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div>
            <h3 className="font-body text-[26px] font-medium leading-[1.4] sm:text-[32px]">
              <ScrollHeadline text={title} />
            </h3>
            <ScrollText order={1}>
              <p className="mt-4 text-muted">{description}</p>
            </ScrollText>
          </div>

            <InfoList items={info} stack={stack} />

            <div className="flex flex-wrap gap-6">
              {liveUrl && <LinkArrow href={liveUrl}>View project</LinkArrow>}
              {codeUrl && (
                <LinkArrow href={codeUrl} icon={GithubIcon}>
                  View code
                </LinkArrow>
              )}
              {youtubeUrl && (
                <LinkArrow href={youtubeUrl} icon={YoutubeIcon}>
                  YouTube demo
                </LinkArrow>
              )}
            </div>
        </div>
      </article>

      {imageExpanded &&
        activeMedia?.type === "image" &&
        createPortal(
          <div
            className={`fixed inset-0 z-[2500] flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 ease-out sm:p-8 ${
              lightboxVisible ? "opacity-100" : "opacity-0"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Full-size project image"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close full-size image"
              className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-black/60 px-4 py-2 text-sm text-white transition-opacity hover:bg-black"
            >
              Close ✕
            </button>

            <img
              src={activeMedia.src}
              alt={activeMedia.alt}
              className={`max-h-full max-w-full object-contain transition-transform duration-300 ease-out ${
                lightboxVisible ? "scale-100" : "scale-95"
              }`}
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
