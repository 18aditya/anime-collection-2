/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import APIHandler from "../../../utils/api/api";
import { getTrendingAnime } from "../../../utils/api/query/query";
import { css } from "@emotion/react";

export default function AnimeList() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getAnime = async () => {
      const res = new APIHandler();
      const query = getTrendingAnime;

      try {
        const result = await res.queryApi(query, {
          page: 1,
          perPage: 10,
        });
        console.log(result);
      } catch (error) {
        setError(error);
      }
    };

    getAnime();
  }, []);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
      `}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          width: 100%;
          height: 250px;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid black;
          background-image: url("https://amymhaddad.s3.amazonaws.com/morocco-blue.png");
        `}
      >
        <div
          css={css`
            position: absolute;
            opacity: 0.5;
            background-color: grey;
            width: 100%;
            height: 100%;
          `}
        />
        <div
          css={css`
            position: relative;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          Welcome to Animepedia
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        {/* {data.map((dt: any) => (
          <div>{dt.title}</div>
        ))} */}
      </div>
    </div>
  );
}
