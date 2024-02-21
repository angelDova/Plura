"use client";

import { Tag } from "@prisma/client";
import { useState } from "react";

type Props = {
  subAccountId: string;
  getSelectedTags: (tags: Tag[]) => void;
  defaultTags?: Tag[];
};

const TagColors = ["BLUE", "ORANGE", "ROSE", "PURPLE", "GREEN"] as const;
export type TagColor = (typeof TagColors)[number];

const TagCreator = ({ subAccountId, getSelectedTags, defaultTags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags || []);
  const [tags, setTags] = useState<Tag[]>([]);

  return <div>tag-creator</div>;
};

export default TagCreator;
