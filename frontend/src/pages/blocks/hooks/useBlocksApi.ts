import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import Block from "../types/Block";

const useBlocksApi = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const blockList = async () => {
    try {
      const response: AxiosResponse<Block[]> = await axios.get("/api/blocks");
      setBlocks(response.data);
    } catch (err) {
      setBlocks([]);
      alert(
        `API: List Error = ${err instanceof Error ? err.toString() : "unknown"}`
      );
    }
  };

  useEffect(() => {
    blockList();
  }, []);

  const blocksDelete = async (id: number) => {
    try {
      await axios.delete(`/api/blocks/${id}`);
    } catch (err) {
      alert(
        `API: Delete Error = ${
          err instanceof Error ? err.toString() : "unknown"
        }`
      );
    }
    blockList();
  };

  const blocksMove = async (id: number, dir: string) => {
    try {
      await axios.post(`/api/blocks/move/${id}`, { dir });
    } catch (err) {
      alert(
        `API: Delete Error = ${
          err instanceof Error ? err.toString() : "unknown"
        }`
      );
    }
    blockList();
  };

  return { blocks, blocksDelete, blockList, blocksMove };
};

export default useBlocksApi;
