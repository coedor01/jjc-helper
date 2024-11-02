"use client";

export default function Body() {
  return (
    <>
      <div className="w-full h-12 bg-sky-600 inline-flex justify-center items-center text-white">
        房间
      </div>
      <div className="fixed top-20 bottom-0 w-full flex flex-col">
        <div className="w-full h-fit flex justify-center items-end gap-6 pb-4">
          <div className="w-12 h-32 bg-sky-50 rounded-md overflow-visible">
            <div className="avatar ">
              <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
          <div className="w-12 h-32 bg-sky-50 rounded-md overflow-visible">
            <div className="avatar ">
              <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
          <div className="w-12 h-32 bg-sky-50 rounded-md overflow-visible  outline-double outline-8 outline-amber-300">
            <div className="avatar">
              <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="relative top-14 left-3  size-6 bg-amber-400 rounded-full text-white inline-flex justify-center items-center text-sm">
              我
            </div>
          </div>
          <div className="w-12 h-32 bg-sky-50 rounded-md overflow-visible">
            <div className="avatar ">
              <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
          <div className="w-12 h-32 bg-sky-50 rounded-md overflow-visible">
            <div className="avatar ">
              <div className="mask mask-hexagon  relative right-1 bottom-6 w-14 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
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
