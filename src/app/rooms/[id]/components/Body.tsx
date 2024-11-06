"use client";

export default function Body() {
  return (
    <>
      <div className="w-full h-12 bg-sky-600 inline-flex justify-center items-center text-white">
        房间
      </div>
      <div className="fixed top-14 bottom-0 w-full flex flex-col">
        <div className="w-full h-72 flex flex-col justify-center items-center gap-2 pl-2 pr-2">
          <div className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
            <div className="avatar size-12 w-14">
              <div className="rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="relative size-full flex flex-col">
              <span className="text-right bg-gradient-to-r from-sky-50 to-sky-600 flex items-center justify-between">
                <span className="pl-1">我·唯我独尊</span>
                <span className="pr-1 text-white">14段</span>
              </span>
              <span className="text-sm text-right pr-1">
                胜率60% | 胜场999+
              </span>
            </div>
          </div>
          <div className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
            <div className="avatar size-12 w-14">
              <div className="rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="relative size-full flex flex-col">
              <span className="text-right bg-gradient-to-r from-sky-50 to-sky-600 flex items-center justify-between">
                <span className="pl-1">我·唯我独尊</span>
                <span className="pr-1 text-white">14段</span>
              </span>
              <span className="text-sm text-right pr-1">
                胜率60% | 胜场999+
              </span>
            </div>
          </div>
          <div className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
            <div className="avatar size-12 w-14">
              <div className="rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="relative size-full flex flex-col">
              <span className="text-right bg-gradient-to-r from-sky-50 to-sky-600 flex items-center justify-between">
                <span className="pl-1">我·唯我独尊</span>
                <span className="pr-1 text-white">14段</span>
              </span>
              <span className="text-sm text-right pr-1">
                胜率60% | 胜场999+
              </span>
            </div>
          </div>
          <div className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
            <div className="avatar size-12 w-14">
              <div className="rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="relative size-full flex flex-col">
              <span className="text-right bg-gradient-to-r from-sky-50 to-sky-600 flex items-center justify-between">
                <span className="pl-1">我·唯我独尊</span>
                <span className="pr-1 text-white">14段</span>
              </span>
              <span className="text-sm text-right pr-1">
                胜率60% | 胜场999+
              </span>
            </div>
          </div>
          <div className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
            <div className="avatar size-12 w-14">
              <div className="rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="relative size-full flex flex-col">
              <span className="text-right bg-gradient-to-r from-sky-50 to-sky-600 flex items-center justify-between">
                <span className="pl-1">我·唯我独尊</span>
                <span className="pr-1 text-white">14段</span>
              </span>
              <span className="text-sm text-right pr-1">
                胜率60% | 胜场999+
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-20 p-2">
          <div className="size-full bg-white rounded-md inline-flex items-center justify-center text-2xl tracking-wide text-sky-900 font-semibold animate-pulse">
            房间还剩 05:00 消失
          </div>
        </div>
        <div className="flex-1 bg-sky-600 rounded-md text-white p-3 overflow-y-auto overscroll-y-contain m-2">
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
        <div className="w-full h-16 bg-sky-600 rounded-t text-white inline-flex items-center pl-2 pr-2 ">
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
