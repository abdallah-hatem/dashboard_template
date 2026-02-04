import TestClient from "./testClient";
// import { GET_BRANCHES, GET_BRANCHES_STATS } from "@/apis";

interface BranchesProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Branches({ searchParams }: BranchesProps) {
  // const { data, current_page, per_page, total } = await GET_BRANCHES({
  //   searchParams: await searchParams,
  // });

  // const { data: stats } = await GET_BRANCHES_STATS();

  return (
    <TestClient
      data={{}}
      meta={{ current_page: 1, per_page: 10, total: 100 }}
    />
  );
}
