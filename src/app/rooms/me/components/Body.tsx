"use client";

interface Props {
  roomId: number;
}

export default function Body({ roomId }: Props) {
  return (
    <div className="fixed top-0 bottom-0 w-full flex justify-center items-center">
      <div className="w-96 flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-3xl text-white tracking-widest outline-double outline-white p-3 rounded-md">
            {`房间号: ${roomId}`}
          </div>
        </div>
        <form className="w-full flex flex-col gap-4">
          <input
            type="text"
            name="password"
            placeholder="请输入房间密码"
            className="input w-full"
          />
          {/* <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">房间密码</span>
              </div>
              <input
                type="text"
                name="password"
                placeholder="请输入房间密码"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div> */}
          <button
            type="submit"
            className="btn w-full bg-sky-50 text-sky-900  animate-pulse"
          >
            进入房间
          </button>
        </form>

        <div className="flex justify-center items-center"></div>
      </div>
    </div>
  );
}
