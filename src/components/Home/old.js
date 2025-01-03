function oldhome() {
  return (
    <>
      <div className="w-full h-full text-white p-0 mt-20 bg-slate-950">
        <div className="w-full h-[100vh] flex justify-center items-center relative">
          <p className="Hero-heading text-white font-extrabold ">Intellihire</p>
          {/* <p className="text-[1vw] absolute  top-[130vh] left-[60%]">Want to clear Interview for your exam</p>
            <p className="text-[1vw] absolute top-[132vh] left -[60%]">But couldn't</p> */}
        </div>
        {/* <div className="absolute top-[calc(100vh-300px)] left-0 ">
          <img src="RobotTalk.png" alt="Talk" width="500px" />
        </div> */}

        <div className="3dTransform">
          {/* <div className="w-4/5 h-[120vh] right-14 bg-[#4E00B0] blur-[120px] transform"> */}
          {/* </div> */}
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50%] flex flex-col items-center justify-center">
            <div className="w-4/5 h-[26%] flex justify-end">
              {" "}
              <motion.div
                className="bg-[#E4098F] w-36 h-36 flex items-center justify-center font-bold rounded-lg border-2 border-[#AD0497] text-wrap text-center text-2xl"
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
              >
                Our Problems
              </motion.div>
            </div>
            <div className="w-4/5 h-[26%] flex justify-center ">
              <motion.div
                className="bg-[#E4098F] w-36 h-36 flex items-center justify-center font-bold rounded-lg border-2 border-[#AD0497] text-wrap text-center text-2xl"
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
              >
                Our Goals
              </motion.div>
            </div>
            <div className="w-4/5 h-[26%] flex justify-start ">
              <motion.div
                className="bg-[#E4098F] w-36 h-36 flex items-center justify-center font-bold rounded-lg border-2 border-[#AD0497] text-wrap text-center text-2xl"
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
              >
                Our Features
              </motion.div>
            </div>
          </div>

          <div
            id="ourGoals"
            className="w-full h-screen flex items-center justify-center gap-10"
          >
            <div className=" w-fit h-80 bg-slate-800 border border-[bg-slate-700] rounded-md">
              <p className="font-semibold">Our Problem</p>{" "}
              <p>
                Huge gap between College Environment and Industry Standards.
              </p>
              <p>Hiring process costly heavy and time taking.</p>
              <p>Lack of platform for practicing the soft skills.</p>
            </div>

            <div className=" w-fit h-80 bg-slate-800 border border-[bg-slate-700] rounded-md">
              <p className="font-semibold">Our Solution</p>{" "}
              <p>
                We are creating new benchmarks to filter out the potential
                candidates.
              </p>
              <p>We provide the relevant question set company specific.</p>
              <p>We ease the process of hiring for company.</p>
              <p>We reduce the cost of hiring per person.</p>
            </div>

            {/* <div className="p-3 w-fit h-fit bg-slate-800 border border-[bg-slate-700] rounded-md">
          <p className="font-semibold">
            Huge gap between student and Intrustries standards
          </p>{" "}
          <p>
            We provide playground for prePlacement Practices by providing them
            relevant question-set company specific.
          </p>
        </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
