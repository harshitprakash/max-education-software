import React from "react";

/**
 * Reusable BreadcrumbArea component
 * Props:
 * - title: heading text
 * - items: array of { label, href? }
 * - shapeImages: array of image src strings (will render up to 4)
 * - className: additional wrapper className
 */
export default function BreadcrumbArea({
  title = "Featured Courses",
  items = [
    { label: "Home", href: "index.html" },
    { label: "Featured Courses" },
  ],
  shapeImages = [
    "img/herobanner/herobanner__1.png",
    "img/herobanner/herobanner__2.png",
    "img/herobanner/herobanner__3.png",
    "img/herobanner/herobanner__5.png",
  ],
  className = "",
}) {
  return (
    <div className={"breadcrumbarea " + className}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb__content__wraper" data-aos="fade-up">
              <div className="breadcrumb__title">
                <h2 className="heading">{title}</h2>
              </div>
              <div className="breadcrumb__inner">
                <ul>
                  {items.map((it, i) => (
                    <li key={i}>
                      {it.href ? <a href={it.href}>{it.label}</a> : it.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shape__icon__2">
        {shapeImages.slice(0, 4).map((src, i) => (
          <img
            key={i}
            loading="lazy"
            className={`shape__icon__img shape__icon__img__${i + 1}`}
            src={src}
            alt={"decorative"}
          />
        ))}
      </div>
    </div>
  );
}
