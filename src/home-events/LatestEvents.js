import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image"; // WP mode ignores this
import "./LatestEvents.css"; // import as global css
import SpeakerList from "./SpeakerList";
import parser from "html-react-parser";

const LatestEvents = ({ attributes, wpEvents }) => {
  const { title = "", featuredEvent = "", selectedPillar = "all", showBottomBlock = false } =
    attributes || {};
  const restBase = window.pioneerblocksData?.restUrl;
  const [eventsData, setEventsData] = useState(wpEvents || null);

  // WP Mode: Fetch from REST API
  useEffect(() => {
    if (!eventsData && restBase) {
      fetch(`${restBase}wp/v2/event?per_page=20&_embed`)
        .then((res) => res.json())
        .then((events) => {
          const mapped = events.map((e) => ({
            id: e.id,
            uri: e.link,
            title: e.title.rendered,
            content: e.content.rendered,
            date: new Date(e.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            terms: {
              nodes: (e._embedded["wp:term"] || [])
                .flat()
                .map((t) => ({ name: t.name, slug: t.slug, taxonomyName: t.taxonomy })),
            },
            featuredImage: {
              node: {
                localFile: null,
                sourceUrl: e._embedded["wp:featuredmedia"]?.[0]?.source_url || null,
              },
            },
            aCFevent: e.acf || {},
          }));
          setEventsData(mapped);
        })
        .catch((err) => console.error("Events fetch error:", err));
    }
  }, [eventsData]);

  // Gatsby mode: GraphQL query if wpEvents not provided
  // (omitted for brevity)

  if (!eventsData) return <p>Loading events…</p>;

  // Filter by pillar
  const filteredEvents = eventsData.filter((event) => {
    if (selectedPillar === "all") return true;
    return event.terms.nodes.some(
      (term) => term.taxonomyName === "pillar" && term.slug === selectedPillar
    );
  });

  // Decode featuredEvent id
  let decodedId = featuredEvent ? atob(featuredEvent) : null;
  let numericId = decodedId ? parseInt(decodedId.split(":").pop(), 10) : null;

  const featuredEventData = numericId
    ? filteredEvents.find((event) => Number(event.id) === numericId)
    : filteredEvents[0];

  // Side events
  const rightSideEventsData = filteredEvents
    .filter((event) => event !== featuredEventData)
    .slice(0, 3);

  const bottomEventsData = showBottomBlock
    ? filteredEvents
        .filter(
          (event) => event !== featuredEventData && !rightSideEventsData.includes(event)
        )
        .slice(0, 4)
    : [];

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text || "";
  };

  return (
    <div className="menu-slider py-4 mt-2">
      <Container>
        <Row className="g-0 d-flex flex-row justify-content-between border-bottom-light align-items-center mb-4">
          <Col className="p-0">
            <p className="my-0 text-blue-main fs-2 fw-bold font-bodoni">
              {title || "Events"}
            </p>
          </Col>
          <Col className="p-0 text-end">
            <a href="/events" className="seeAllbtn text-decoration-underline">
              See All
            </a>
          </Col>
        </Row>
        <Row className="g-0">
          <Col lg={8} className="mb-4 ps-0">
            {featuredEventData && (
              <a href={featuredEventData.uri} className="card border-0 h-100">
                {featuredEventData.featuredImage?.node?.localFile ? (
                  <GatsbyImage
                    image={getImage(
                      featuredEventData.featuredImage?.node?.localFile?.childImageSharp
                    )}
                    alt={featuredEventData.title}
                    className="featuredImg"
                  />
                ) : featuredEventData.featuredImage?.node?.sourceUrl ? (
                  <img
                    src={featuredEventData.featuredImage.node.sourceUrl}
                    alt={featuredEventData.title}
                    className="featuredImg"
                  />
                ) : null}
                <div className="cardBody">
                  <p className="cardBodyFeatured">Featured</p>
                  <p className="cardBodyTitle">{featuredEventData.title}</p>
                  {featuredEventData?.content && (
                    <div className="subtitle d-none d-lg-block">
                      {parser(truncateText(featuredEventData.content, 250))}
                    </div>
                  )}
                  {featuredEventData?.aCFevent?.speakers?.length > 0 && (
                    <SpeakerList speakers={featuredEventData?.aCFevent?.speakers} />
                  )}
                </div>
              </a>
            )}
          </Col>
          <Col lg={4} className="p-0">
            <Row className="g-3">
              {rightSideEventsData?.map((item) => (
                <Col md={12} key={item?.id} className="mb-lg-1">
                  <a href={item.uri} className="eventCard d-flex flex-row p-2">
                    <div className="flex-grow-1">
                      <p className="eventType">
                        {item?.terms?.nodes[0]?.name || "Webinar"}
                      </p>
                      <p className="eventTitle">{item?.title}</p>
                      {item?.aCFevent?.speakers?.length > 0 && (
                        <SpeakerList speakers={item?.aCFevent?.speakers} />
                      )}
                    </div>
                    <div className="d-flex flex-row gap-2 h-100">
                      <div className="dateBadge">
                        <span className="dateNumber font-bodoni">
                          {item?.date?.split(" ")[0]}
                        </span>
                        <span className="dateText">
                          {item?.date?.replace(item.date.split(" ")[0] + " ", "")}
                        </span>
                      </div>
                    </div>
                  </a>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        {showBottomBlock && bottomEventsData.length > 0 && (
          <Row className="g-0 mt-4">
            {bottomEventsData.map((item) => (
              <Col md={3} key={item?.id} className="mb-4">
                <div className="eventCard h-100 d-flex flex-row gap-2 p-2">
                  <div className="flex-grow-1">
                    <p className="eventType">
                      {item?.terms?.nodes[0]?.name || "Webinar"}
                    </p>
                    <p className="eventTitle">{item?.title}</p>
                    {item?.aCFevent?.speakers?.length > 0 && (
                      <SpeakerList speakers={item?.aCFevent?.speakers} />
                    )}
                  </div>
                  <div className="d-flex flex-row gap-2 h-100">
                    <div className="dateBadge">
                      <span className="dateNumber font-bodoni">
                        {item?.date?.split(" ")[0]}
                      </span>
                      <span className="dateText">
                        {item?.date?.replace(item.date.split(" ")[0] + " ", "")}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default LatestEvents;