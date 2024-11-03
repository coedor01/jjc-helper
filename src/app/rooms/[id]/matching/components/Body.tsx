export default function Body() {
  return (
    <div className="fixed top-0 bottom-0 w-full flex flex-col justify-center items-center gap-16">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-xl text-white tracking-wider">名剑大会五对五</div>
        <div className="text-3xl tracking-widest outline-double outline-amber-300 p-3 rounded-md text-amber-300">
          匹配成功
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-end gap-6 pb-4">
        <div className="relative w-12 h-32 bg-sky-50 rounded-md overflow-visible">
          <div className="avatar ">
            <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
              <img src="/image/xf/10028.png" />
            </div>
          </div>
          <div className="absolute top-8 w-full inline-flex flex-col justify-center items-center gap-2">
            <span className="text-sky-900">15段</span>
            <span className="text-sky-900 text-xs">999+场</span>
            <span className="text-sky-900 text-xs">55%胜</span>
          </div>

          <div className="absolute bottom-36 mb-2  w-full text-white inline-flex justify-center items-center text-sm tracking-wide">
            已准备!
          </div>
        </div>
        <div className="relative w-12 h-32 bg-sky-50 rounded-md overflow-visible">
          <div className="avatar ">
            <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
              <img src="/image/xf/10786.png" />
            </div>
          </div>
          <div className="absolute top-8 w-full inline-flex flex-col justify-center items-center gap-2">
            <span className="text-sky-900">15段</span>
            <span className="text-sky-900 text-xs">999+场</span>
            <span className="text-sky-900 text-xs">55%胜</span>
          </div>
          <div className="absolute bottom-36 mb-2  w-full text-white inline-flex justify-center items-center text-sm tracking-wide">
            已准备!
          </div>
        </div>
        <div className="relative w-12 h-32 bg-sky-50 rounded-md overflow-visible  outline-double outline-8 outline-amber-300">
          <div className="avatar">
            <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
              <img src="/image/xf/10028.png" />
            </div>
          </div>
          <div className="absolute top-8 w-full inline-flex flex-col justify-center items-center gap-2">
            <span className="text-sky-900">15段</span>
            <span className="text-sky-900 text-xs">999+场</span>
            <span className="text-sky-900 text-xs">55%胜</span>
          </div>
          <div className="relative top-14 left-3  size-6 bg-amber-400 rounded-full text-white inline-flex justify-center items-center text-sm">
            我
          </div>
        </div>
        <div className="relative w-12 h-32 bg-sky-50 rounded-md overflow-visible">
          <div className="absolute bottom-36 mb-2  w-full text-white inline-flex justify-center items-center text-sm tracking-wide">
            已准备!
          </div>
          <div className="avatar ">
            <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
              <img src="/image/xf/10786.png" />
            </div>
          </div>
          <div className="absolute top-8 w-full inline-flex flex-col justify-center items-center gap-2">
            <span className="text-sky-900">15段</span>
            <span className="text-sky-900 text-xs">999+场</span>
            <span className="text-sky-900 text-xs">55%胜</span>
          </div>
        </div>
        <div className="relative w-12 h-32 bg-sky-50 rounded-md overflow-visible outline-double outline-8 outline-lime-600">
          <div className="absolute bottom-36 mb-2  w-full text-white inline-flex justify-center items-center text-sm tracking-wide">
            已准备!
          </div>
          <div className="avatar ">
            <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
              <img src="/image/xf/10786.png" />
            </div>
          </div>
          <div className="absolute top-8 w-full inline-flex flex-col justify-center items-center gap-2">
            <span className="text-sky-900">14段</span>
            <span className="text-sky-900 text-xs">653场</span>
            <span className="text-sky-900 text-xs">52%胜</span>
          </div>
          <div className="relative top-14 left-3  size-6 bg-lime-600 rounded-full text-white inline-flex justify-center items-center text-sm">
            友
          </div>
        </div>
      </div>
      <button className="btn btn-circle size-36 animate-pulse	text-sky-900 text-2xl">
        准备
      </button>
      <div className="flex ustify-center items-center"></div>
    </div>
  );
}
