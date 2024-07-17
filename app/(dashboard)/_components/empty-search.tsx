import Image from "next/image";

const EmptySearch = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={"/emptySearch.png"}
        alt="emptySearch"
        height={140}
        width={140}
      />
      <h2 className="text-2xl mt-6 font-semibold">No Reasult Found</h2>
      <h2 className="text-sm text-muted-foreground mt-2">
        Try Searching For Something Else
      </h2>
    </div>
  );
};

export default EmptySearch;
