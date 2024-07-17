"use client";

import RenameModel from "@/components/models/rename-model";
import React, { useEffect, useState } from "react";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <RenameModel />
    </div>
  );
};

export default ModelProvider;
