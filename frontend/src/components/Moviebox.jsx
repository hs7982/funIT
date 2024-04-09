const Moviebox = () => {
  return (
    <div className="">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1h6j7k.img?w=640&h=457&m=6&x=159&y=174&s=359&d=94"
            alt="파묘"
          />
        </figure>
        <div className="p-4">
          <h2 className="card-title">
            파묘
            <div className="badge badge-secondary">NEW</div>
            <div className="grow"></div>
            <div className="badge badge-outline">오컬트</div>
            <div className="badge badge-outline">사회풍자</div>
          </h2>
          <p></p>
          <div className="pt-2 card-actions justify-end">
            <div className="pt-1 flex-1">110% 달성</div>
            <button className="btn btn-sm bg-fuchsia-300">투자하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moviebox;
