"use client";

import Button from "./Button";

const Card = ({ amount }: any) => {
  return (
    <>
      {amount.map((item: any, i: number) => {
        return (
          <div
            className="m-2 p-2 rounded-lg shadow-lg border border-gray-200 max-h-[400px] grid grid-rows-12"
            key={i}
          >
            <div>
              <p className="text-xl mb-2">Project name</p>
            </div>

            <div>
              <p className="my-2 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                explicabo quaerat eos dolorum Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Dolores, debitis quibusdam ipsum
                nulla quaerat laudantium ullam sunt placeat exercitationem non
                voluptas fugit repellat, quisquam quo recusandae illo sapiente
                porro sint.
              </p>
            </div>
            <div>
              <div className="flex">
                <p className="text-gray-500 text-sm mb-2">Last updated:</p>
                <span className="text-black text-sm">05/10/2023</span>
              </div>
            </div>

            <div className="flex justify-between flex-row">
              <Button
                text="Open"
                className=" w-[48%] h-8 flex justify-center items-center"
              />
              <Button
                text="Edit"
                className=" w-[48%] h-8 flex justify-center items-center"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
