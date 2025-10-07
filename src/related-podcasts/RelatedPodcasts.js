import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useStaticQuery, graphql, Link } from "gatsby"
import * as styles from "./RelatedPodcasts.module.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const RelatedPodcasts = ({ attributes }) => {
  const { title = "", description = "" } = attributes || {}

  const data = useStaticQuery(graphql`
    query {
      allWpEpisode(sort: { fields: date, order: DESC }) {
        nodes {
          aCFepisode {
            podcastEmbed
            episodespeakers {
              episodespeakerName
              episodespeakerBio
              episodespeakerImage {
                node {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 400)
                    }
                  }
                }
              }
            }
            transcription
          }
          id
          title
          uri
          date(formatString: "DD MMMM, YYYY")
          terms {
            nodes {
              name
              slug
              taxonomyName
            }
          }
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 400)
                }
              }
            }
          }
        }
      }
    }
  `)

  // Group episodes by podcast and select the latest episode from each, up to 3
  const episodesByPodcast = {}
  data.allWpEpisode.nodes.forEach(episode => {
    const podcastTerm = episode.terms.nodes.find(
      term => term.taxonomyName === "podcast"
    )
    const podcastSlug = podcastTerm ? podcastTerm.slug : "unknown"
    if (!episodesByPodcast[podcastSlug]) {
      episodesByPodcast[podcastSlug] = episode
    }
  })

  // Convert to array and limit to 3 episodes
  const episodes = Object.values(episodesByPodcast).slice(0, 3)

  return (
    <div className={styles.podcastSection}>
      <Container>
        <div className="d-flex flex-row justify-content-between border-bottom-light align-items-center mb-4">
          <Col md={6} className="p-0">
            <p className="my-0 text-blue-main fs-2 fw-bold font-bodoni">
              {title || "Podcasts"}
            </p>
          </Col>
          <Col md={6} className="p-0 text-end">
            <Link
              to="/podcasts"
              className="seeAllbtn text-decoration-underline"
            >
              See All
            </Link>
          </Col>
        </div>
        {description && (
          <Row className={`${styles.podcastDescription} g-0`}>
            <Col md={12} className="p-0">
              <p className="mb-0">{description}</p>
            </Col>
          </Row>
        )}
        <Row className="g-4 mt-4">
          {episodes.map(podcast => (
            <Col lg={4} key={podcast.id} className={styles.podcastCard}>
              <Link to={podcast.uri} className={styles.card}>
                <GatsbyImage
                  image={getImage(
                    podcast.featuredImage?.node?.localFile?.childImageSharp
                  )}
                  alt={podcast.title}
                  className={styles.podcastImage}
                />
                <div className="d-flex justify-content-around">
                  <div className={styles.cardText}>
                    <p className={styles.episodeTitle}>{podcast.title}</p>
                  </div>
                  <div className="d-none d-md-block justify-content-center text-center gap-3">
                    {podcast.aCFepisode.episodespeakers?.[0]
                      ?.episodespeakerImage ? (
                      <GatsbyImage
                        image={getImage(
                          podcast.aCFepisode.episodespeakers?.[0]
                            ?.episodespeakerImage?.node?.localFile
                            ?.childImageSharp
                        )}
                        alt={podcast.title}
                        className={styles.authorImage}
                      />
                    ) : (
                      <svg
                        className={styles.authorImage}
                        width="90"
                        height="90"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="45"
                          cy="45"
                          r="43.5"
                          fill="#C4C4C4"
                          stroke="white"
                          stroke-width="3"
                        />
                        <path
                          d="M45.4999 41.6667C49.1818 41.6667 52.1666 38.6819 52.1666 35C52.1666 31.3181 49.1818 28.3334 45.4999 28.3334C41.818 28.3334 38.8333 31.3181 38.8333 35C38.8333 38.6819 41.818 41.6667 45.4999 41.6667Z"
                          fill="white"
                        />
                        <path
                          d="M58.8334 54.1666C58.8334 58.3083 58.8334 61.6666 45.5001 61.6666C32.1667 61.6666 32.1667 58.3083 32.1667 54.1666C32.1667 50.025 38.1367 46.6666 45.5001 46.6666C52.8634 46.6666 58.8334 50.025 58.8334 54.1666Z"
                          fill="white"
                        />
                      </svg>
                    )}
                    <p className="m-0 text-blue-main fw-bold">
                      {
                        podcast?.aCFepisode?.episodespeakers?.[0]
                          ?.episodespeakerName
                      }
                    </p>
                  </div>
                </div>
                <div className={styles.cardTextMobile}>
                  <p className={styles.episodeTitle}>{podcast.title}</p>
                  <div className="text-center gap-3">
                    {podcast.aCFepisode.episodespeakers?.[0]
                      ?.episodespeakerImage ? (
                      <GatsbyImage
                        image={getImage(
                          podcast.aCFepisode.episodespeakers?.[0]
                            ?.episodespeakerImage?.node?.localFile
                            ?.childImageSharp
                        )}
                        alt={podcast.title}
                        className={styles.authorImage}
                      />
                    ) : (
                      <svg
                        width="90"
                        height="90"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="45"
                          cy="45"
                          r="43.5"
                          fill="#C4C4C4"
                          stroke="white"
                          stroke-width="3"
                        />
                        <path
                          d="M45.4999 41.6667C49.1818 41.6667 52.1666 38.6819 52.1666 35C52.1666 31.3181 49.1818 28.3334 45.4999 28.3334C41.818 28.3334 38.8333 31.3181 38.8333 35C38.8333 38.6819 41.818 41.6667 45.4999 41.6667Z"
                          fill="white"
                        />
                        <path
                          d="M58.8334 54.1666C58.8334 58.3083 58.8334 61.6666 45.5001 61.6666C32.1667 61.6666 32.1667 58.3083 32.1667 54.1666C32.1667 50.025 38.1367 46.6666 45.5001 46.6666C52.8634 46.6666 58.8334 50.025 58.8334 54.1666Z"
                          fill="white"
                        />
                      </svg>
                    )}
                    <p className="m-0 text-blue-main fw-bold">
                      {
                        podcast?.aCFepisode?.episodespeakers?.[0]
                          ?.episodespeakerName
                      }
                    </p>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.podcastFooter}>
                    <Link
                      to={podcast.uri}
                      className={styles.listenLink}
                      aria-label="Share"
                    >
                      <svg
                        width="37"
                        height="36"
                        viewBox="0 0 37 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 18C5 19.1935 5.47411 20.3381 6.31802 21.182C7.16193 22.0259 8.30653 22.5 9.5 22.5C10.6935 22.5 11.8381 22.0259 12.682 21.182C13.5259 20.3381 14 19.1935 14 18C14 16.8065 13.5259 15.6619 12.682 14.818C11.8381 13.9741 10.6935 13.5 9.5 13.5C8.30653 13.5 7.16193 13.9741 6.31802 14.818C5.47411 15.6619 5 16.8065 5 18Z"
                          stroke="#293C5C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M23 9C23 10.1935 23.4741 11.3381 24.318 12.182C25.1619 13.0259 26.3065 13.5 27.5 13.5C28.6935 13.5 29.8381 13.0259 30.682 12.182C31.5259 11.3381 32 10.1935 32 9C32 7.80653 31.5259 6.66193 30.682 5.81802C29.8381 4.97411 28.6935 4.5 27.5 4.5C26.3065 4.5 25.1619 4.97411 24.318 5.81802C23.4741 6.66193 23 7.80653 23 9Z"
                          stroke="#293C5C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M23 27C23 28.1935 23.4741 29.3381 24.318 30.182C25.1619 31.0259 26.3065 31.5 27.5 31.5C28.6935 31.5 29.8381 31.0259 30.682 30.182C31.5259 29.3381 32 28.1935 32 27C32 25.8065 31.5259 24.6619 30.682 23.818C29.8381 22.9741 28.6935 22.5 27.5 22.5C26.3065 22.5 25.1619 22.9741 24.318 23.818C23.4741 24.6619 23 25.8065 23 27Z"
                          stroke="#293C5C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.5508 16.0531L23.4508 10.9531"
                          stroke="#293C5C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.5508 19.9531L23.4508 25.0531"
                          stroke="#293C5C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Share
                    </Link>
                    <Link to={podcast.uri} className={styles.listenLink}>
                      Listen
                      <svg
                        width="37"
                        height="36"
                        viewBox="0 0 37 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_6230_10810"
                          style={{maskType:'luminance'}}
                          maskUnits="userSpaceOnUse"
                          x="1"
                          y="1"
                          width="35"
                          height="35"
                        >
                          <path
                            d="M18.502 33.002C26.7865 33.002 33.502 26.2865 33.502 18.002C33.502 9.71745 26.7865 3.00195 18.502 3.00195C10.2175 3.00195 3.50195 9.71745 3.50195 18.002C3.50195 26.2865 10.2175 33.002 18.502 33.002Z"
                            fill="white"
                            stroke="white"
                            stroke-width="4"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.5039 18.0026V12.8066L20.0039 15.4046L24.5039 18.0026L20.0039 20.6006L15.5039 23.1986V18.0026Z"
                            fill="black"
                            stroke="black"
                            stroke-width="4"
                            stroke-linejoin="round"
                          />
                        </mask>
                        <g mask="url(#mask0_6230_10810)">
                          <path d="M0.5 0H36.5V36H0.5V0Z" fill="#293C5C" />
                        </g>
                      </svg>
                    </Link>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default RelatedPodcasts
