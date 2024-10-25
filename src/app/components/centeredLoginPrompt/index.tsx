"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  jumpUrl: string;
}

const CenteredLoginPrompt: React.FC<Props> = ({ jumpUrl }) => {
  return (
    <div className="h-96 justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <a role="button" className="btn btn-error" href={jumpUrl}>
              去登陆
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenteredLoginPrompt;
