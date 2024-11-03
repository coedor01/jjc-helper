"use client";

export default function Body() {
  return (
    <>
      <div className="fixed top-14 bottom-0 w-full flex flex-col">
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
        <div className="w-full h-24 p-2 flex flex-col justify-center items-center">
          <div className="size-full bg-white rounded-md inline-flex flex-col items-center justify-center  animate-pulse">
            <span className="text-md text-sky-900 font-semibold tracking-wider">
              名剑大会五对五
            </span>
            <span className="text-2xl tracking-wide text-sky-900 font-semibold">
              房间还剩 05:00 消失
            </span>
          </div>
        </div>
        <div className="flex-1 bg-sky-800 rounded-md text-white p-3 overflow-y-auto overscroll-y-contain m-2">
          <div>张三：hello 大家好</div>
          <div>张三：我们今天去哪里玩</div>
          <div>李四：要不去爬山吧</div>
          <div>王五：我不想出门</div>
          <div>赵六：看明天天气怎么样吧</div>
          <div>张三：hello 大家好</div>
          <div>张三：我们今天去哪里玩</div>
          <div>李四：要不去爬山吧</div>
          <div>王五：我不想出门</div>
          <div>赵六：看明天天气怎么样吧</div>
          <div>张三：hello 大家好</div>
          <div>张三：我们今天去哪里玩</div>
          <div>李四：要不去爬山吧</div>
          <div>王五：我不想出门</div>
          <div>赵六：看明天天气怎么样吧</div>
        </div>
        <div className="w-full h-16 bg-sky-800 rounded-t text-white inline-flex items-center pl-2 pr-2 ">
          <input
            type="text"
            placeholder="请输入要发送的文本"
            className="flex-1 input  text-black"
          />
        </div>
      </div>
    </>
  );
}
