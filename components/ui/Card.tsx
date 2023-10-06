"use client";

import Button from "./Button";

const Card = ({ amount }: any) => {
  return (
    <>
      {amount.map((item: any, i: number) => {
        return (
          <div className="p-4 mx-4 my-2 rounded shadow-lg border border-gray-200 h-[340px]" key={i}>
            <p className="text-3xl my-2 h-1/5">Project name</p>
            <p className="my-2 h-2/5 ellipsis2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate eius dolore
              exercitationem voluptates, eum neque. In labore, provident corrupti earum pariatur
              suscipit repellendus mai ores at assumenda, libero explicabo.
            </p>

            <p className="text-gray-500 h-1/5 ">
              Last updated: <p className="text-black">05/10/2023</p>
            </p>
            <div className="h-1/5 flex justify-between flex-row">
              <Button text="Open" className=" w-[150px] h-10" />
              <Button text="Edit" className=" w-[150px] h-10" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
