import React from "react";
import "../circle.css";

const Circle = () => {
  return (
    <>
      <ol reversed className="paces" lang="en">
        <li className="pace js">
          JS+
          <blockquote className="quote js">
            JS+: The JavaScript ecosystem (not the language!): Anyone else feels
            overwhelmed by the rate of rapid changes here?
          </blockquote>
        </li>
        <li className="pace css">
          CSS
          <blockquote className="quote css">
            CSS: This is moving in a nice click lately, with lots of useful new
            stuff enabled in the browsers.
          </blockquote>
        </li>
        <li className="pace html">
          HTML
          <blockquote className="quote html">
            HTML: Started with 20 something "tags", now we have over 100
            "elements", but I feel that I've been able to keep up with the pace
            of change here.
          </blockquote>
        </li>
        <li className="pace url">
          URLs
          <blockquote className="quote url">
            URLs: Sadly they are frequently changing; links die. We should work
            hard to keep URLs unchanged, but that's not how it is.
          </blockquote>
        </li>
        <li className="pace http">
          HTTP
          <blockquote className="quote http">
            HTTP: Gradually changed (http/2), but it kind of feels good that it
            doesn't constantly change underneath us.
          </blockquote>
        </li>
        <li className="pace tcpip">
          GNN
          <blockquote className="quote tcpip">
            GNN: Graph Neural Networks (GNNs) are a class of neural networks
            tailored for analyzing graph-structured data, enabling them to
            capture intricate relationships among interconnected entities. They
            aggregate information from neighboring nodes to perform tasks like
            node classification, link prediction, and graph classification.
          </blockquote>
        </li>
      </ol>
      <footer>
        <blockquote>
          <p>
            Fast gets all the attention,
            <br />
            but Slow has all the power
          </p>
          <cite>Stewart Brand "Pacelayers"</cite>
        </blockquote>
        {/* <a href="https://vimeo.com/373128517">
          The Layers of the Web - Jeremy Keith
        </a> */}
      </footer>
    </>
  );
};

export default Circle;
