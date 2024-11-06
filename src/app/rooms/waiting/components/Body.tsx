export default function Body() {
  return (
    <div className="fixed top-0 bottom-0 w-full flex flex-col justify-center items-center gap-12">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-xl text-white tracking-wider">名剑大会五对五</div>
        <div className="text-3xl text-white tracking-widest outline-double outline-white p-3 rounded-md">
          246568
        </div>
      </div>
      <div className="w-full min-h-32 h-fit flex flex-col justify-center items-center gap-2 pl-2 pr-2">
        <div className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
          <div className="avatar size-12 w-14">
            <div className="rounded-full ring ring-offset-1 ring-offset-base-100 ring-amber-300">
              <img src="/image/xf/10028.png" />
            </div>
          </div>
          <div className="relative size-full flex flex-col">
            <span className="text-right bg-gradient-to-r from-sky-50 to-sky-700 flex items-center justify-between">
              <span className="pl-1 ">花间游不动·唯我独尊</span>
              <span className="pr-1 flex gap-1">
                <span className="text-amber-300 font-semibold">[我]</span>
                <span className=" text-white">14段</span>
              </span>
            </span>
            <span className="text-sm text-right pr-1">胜率60% | 胜场999+</span>
          </div>
        </div>
        <div className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
          <div className="avatar size-12 w-14">
            <div className="rounded-full ring ring-offset-1 ring-offset-base-100 ring-lime-300">
              <img src="/image/xf/10786.png" />
            </div>
          </div>
          <div className="relative size-full flex flex-col">
            <span className="text-right bg-gradient-to-r from-sky-50 to-sky-700 flex items-center justify-between">
              <span className="pl-1">滴滴顺风策·唯我独尊</span>
              <span className="pr-1  flex gap-1">
                <span className="text-lime-300 font-semibold">[友]</span>
                <span className="text-white">14段</span>
              </span>
            </span>
            <span className="text-sm text-right pr-1">胜率60% | 胜场999+</span>
          </div>
        </div>
      </div>
      <button className="btn btn-circle size-36 animate-pulse	text-sky-900 text-2xl">
        匹配
      </button>
      <div className="flex ustify-center items-center"></div>
    </div>
  );
}
