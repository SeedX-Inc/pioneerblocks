import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image"; // WP mode ignores this
import parser from "html-react-parser";
import "./LatestNews.css"; // plain CSS, no modules

const LatestNews = ({ attributes, wpPosts }) => {
  const {
    title = "",
    featuredPost = "",
    selectedPillar = "all",
    showBottomBlock = false,
  } = attributes || {};

    console.log("latest-news react loaded");
  const restBase = window.pioneerblocksData?.restUrl;
  const [postsData, setPostsData] = useState(wpPosts || null);

  useEffect(() => {
    if (!postsData && restBase) {
      fetch(`${restBase}wp/v2/posts?per_page=20&_embed`)
        .then((res) => res.json())
        .then((posts) => {
          const mapped = posts.map((p) => ({
            id: p.id,
            uri: p.link,
            title: p.title.rendered,
            excerpt: p.excerpt.rendered,
            date: new Date(p.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            categories: {
              nodes: (p._embedded["wp:term"] || [])
                .flat()
                .filter((t) => t.taxonomy === "category")
                .map((t) => ({ name: t.name })),
            },
            pillars: {
              nodes: (p._embedded["wp:term"] || [])
                .flat()
                .filter((t) => t.taxonomy === "pillar")
                .map((t) => ({ name: t.name, slug: t.slug })),
            },
            featuredImage: {
              node: {
                localFile: null,
                sourceUrl:
                  p._embedded["wp:featuredmedia"]?.[0]?.source_url || null,
              },
            },
          }));
          setPostsData(mapped);
          console.log(mapped);
        })
        .catch((err) => console.error("Posts fetch error:", err));
    }
  }, [postsData]);

  if (!postsData && typeof useStaticQuery !== "undefined") {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const data = useStaticQuery(graphql`
        query LatestNewsQuery {
          allWpPost(sort: { fields: date, order: DESC }) {
            nodes {
              id
              uri
              title
              excerpt
              date(formatString: "MMMM DD, YYYY")
              categories {
                nodes {
                  name
                }
              }
              pillars {
                nodes {
                  name
                  slug
                }
              }
              featuredImage {
                node {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 600)
                    }
                  }
                }
              }
            }
          }
        }
      `);
      setPostsData(data.allWpPost.nodes);
    } catch {
      // Do nothing in WP
    }
  }

  if (!postsData) return <p>Loading news…</p>;

  const filteredPosts = postsData.filter((post) => {
    if (selectedPillar === "all") return true;
    return post.pillars.nodes.some((pillar) => pillar.slug === selectedPillar);
  });

  const decodedId = featuredPost ? atob(featuredPost) : null;
  const numericId = decodedId ? parseInt(decodedId.split(":").pop(), 10) : null;

  const featuredPostData = numericId
    ? filteredPosts.find((post) => Number(post.id) === numericId)
    : filteredPosts[0];

  const rightSideNewsData = filteredPosts
    .filter((post) => post !== featuredPostData)
    .slice(0, 5);

  const bottomNewsData = showBottomBlock
    ? filteredPosts
        .filter(
          (post) =>
            post !== featuredPostData && !rightSideNewsData.includes(post)
        )
        .slice(0, 4)
    : [];

  return (
    <div className="menu-slider py-4">
      <Container>
        <Row className="d-none d-md-flex g-0 flex-row justify-content-between border-bottom-light align-items-center mb-4">
          <Col sm={6} className="col-6 p-0">
            <p className="my-0 text-blue-main fs-2 fw-bold font-bodoni">
              {title || "Latest"}
            </p>
          </Col>
          <Col md={6} className="col-6 p-0 text-end">
            <a
              href="/search?postType=post"
              className="seeAllbtn text-end text-decoration-underline"
            >
              See All
            </a>
          </Col>
        </Row>
        <Row className="g-0">
          <Col lg={8} className="mb-4 ps-0">
            {featuredPostData && (
              <a
                href={featuredPostData.uri}
                className="card border-0"
              >
                {featuredPostData.featuredImage?.node?.localFile ? (
                  <GatsbyImage
                    image={getImage(
                      featuredPostData.featuredImage?.node?.localFile
                        ?.childImageSharp
                    )}
                    alt={featuredPostData.title}
                    className="featuredImg"
                  />
                ) : featuredPostData.featuredImage?.node?.sourceUrl ? (
                  <img
                    src={featuredPostData.featuredImage.node.sourceUrl}
                    alt={featuredPostData.title}
                    className="featuredImg"
                  />
                ) : null}
                <div className="cardBody">
                  <p className="cardBodyFeatured">Featured</p>
                  <p className="text-blue-main fw-bold fs-3 card-title">
                    {featuredPostData.title}
                  </p>
                  <div className="cardDescr">
                    {featuredPostData?.excerpt &&
                      parser(featuredPostData?.excerpt)}
                  </div>
                  <p className="cardDate">{featuredPostData.date}</p>
                </div>
              </a>
            )}
          </Col>

          <Col lg={4} className="rightCards">
            <Row className="g-3">
              {rightSideNewsData.map((item, index) => (
                <a
                  key={item.id}
                  href={item.uri}
                  className={`text-decoration-none ${
                    index === 4 ? "d-lg-block d-none" : ""
                  }`}
                >
                  <Col md={12} className="rightCard">
                    <div className="d-flex justify-content-around gap-1">
                      {item.featuredImage?.node?.localFile ? (
                        <GatsbyImage
                          image={getImage(
                            item?.featuredImage?.node?.localFile?.childImageSharp
                          )}
                          alt={item.title}
                          className="imgRight"
                        />
                      ) : item.featuredImage?.node?.sourceUrl ? (
                        <img
                          src={item.featuredImage.node.sourceUrl}
                          alt={item.title}
                          className="imgRight"
                        />
                      ) : null}
                      <div className="cardBody mt-0">
                        <p className="mobSizeFont fw-normal text-blue-main m-0 fs-6">
                          <strong className="text-blue-main">NEWS</strong> /{" "}
                          {item?.pillars?.nodes[0]?.name || "Opportunity"}
                        </p>
                        <p className="sideTitle fw-bold text-blue-main mb-0 mt-2">
                          {item.title}
                        </p>
                        <p className="cardDate mt-2">{item.date}</p>
                      </div>
                    </div>
                  </Col>
                </a>
              ))}
            </Row>
          </Col>
        </Row>

        {showBottomBlock && (
          <Row className="d-none d-lg-flex mt-4 g-0 p-0">
            {bottomNewsData.map((item) => (
              <Col md={3} key={item.id} className="ps-0 pe-4">
                <a
                  href={item.uri}
                  className="d-flex flex-column gap-1 text-default text-decoration-none"
                >
                  {item.featuredImage?.node?.localFile ? (
                    <GatsbyImage
                      image={getImage(
                        item?.featuredImage?.node?.localFile?.childImageSharp
                      )}
                      alt={item.title}
                      className="imgBottom"
                    />
                  ) : item.featuredImage?.node?.sourceUrl ? (
                    <img
                      src={item.featuredImage.node.sourceUrl}
                      alt={item.title}
                      className="imgBottom"
                    />
                  ) : null}
                  <div className="cardBody mt-0">
                    <p className="fw-normal text-blue-main m-0 fs-6">
                      <strong className="text-blue-main fs-6">NEWS</strong> /{" "}
                      {item?.pillars?.nodes[0]?.name || "Opportunity"}
                    </p>
                    <p className="sideTitle fw-bold text-blue-main mb-0 mt-2">
                      {item.title}
                    </p>
                    <p className="cardDate mt-2">{item.date}</p>
                  </div>
                </a>
              </Col>
            ))}
          </Row>
        )}

        {showBottomBlock && (
          <Row className="d-flex d-lg-none mt-4 g-0 p-0">
            {bottomNewsData.slice(0, 2).map((item) => (
              <Col lg={3} key={item.id} className="mobileBottomNews">
                <a
                  href={item.uri}
                  className="d-flex flex-column gap-1 text-decoration-none text-default"
                >
                  <div className="cardBody mt-0">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="fw-normal text-blue-main m-0 fs-6">
                        <strong className="text-blue-main fs-6">NEWS</strong> /{" "}
                        {item?.pillars?.nodes[0]?.name || "Opportunity"}
                      </p>
                      <p className="cardDate mt-0">{item.date}</p>
                    </div>
                    <p className="sideTitle fw-bold text-blue-main mb-0 mt-0">
                      {item.title}
                    </p>
                  </div>
                </a>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default LatestNews;
