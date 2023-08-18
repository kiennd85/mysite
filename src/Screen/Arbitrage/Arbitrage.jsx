import Table_obj from './Table_obj';
import Table_head from './Table_head';

import useHook from './useHook';
import Table_addrow from './Table_addrow';

const Arbitrage = () => {
  const { btnStart, btnStop, btnTest, o1_fitfi, o2_fitfi, o3_fitfi, o4_fitfi, o1_kcal, o2_kcal, o3_kcal, o1_primal, o2_primal, o3_primal, o4_primal, o1_rjv, o2_rjv, o3_rjv, o1_dao, o2_dao, o3_dao, o1_xeta, o2_xeta, o3_xeta, o4_xeta, o4_kcal, o5_xeta,o1_newtoken,o2_newtoken,o3_newtoken, t1_fitfi, t2_fitfi, t1_kcal, t2_kcal, t3_kcal, t1_primal, t1_spex } = useHook();
  //console.log(111, obj_main);
  return (
    <>
      <div
        className="kn_container"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <div
          className="kn_box2"
          style={{ marginRight: '5px' }}
        >
          <div>
            <Table_head></Table_head>
          </div>
          <br></br>

          <div>
            <Table_addrow table_obj={o1_kcal}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o3_kcal}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o4_kcal}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o2_kcal}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={o2_primal}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={o1_dao}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o2_dao}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o3_dao}></Table_addrow>
          </div>
          <br></br>
          {/* <div>
            <Table_addrow table_obj={o1_xeta}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o2_xeta}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o3_xeta}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o4_xeta}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o5_xeta}></Table_addrow>
          </div> */}

          <div>
            <Table_addrow table_obj={o1_primal}></Table_addrow>
          </div>

          <div>
            <Table_addrow table_obj={o3_primal}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o4_primal}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={o1_rjv}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o2_rjv}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o3_rjv}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={o1_newtoken}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o2_newtoken}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o3_newtoken}></Table_addrow>
          </div>
        </div>
        <div
          className="kn_box1"
          style={{ marginLeft: '5px' }}
        >
          <div>
            <Table_head></Table_head>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={o1_fitfi}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o2_fitfi}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o3_fitfi}></Table_addrow>
          </div>
          <div>
            <Table_addrow table_obj={o4_fitfi}></Table_addrow>
          </div>

          <div style={{ margin: '10px 0 10px 0' }}>==============================swap====================================================</div>
          <div>
            <Table_addrow table_obj={t1_fitfi}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={t2_fitfi}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={t1_kcal}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={t2_kcal}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={t3_kcal}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={t1_primal}></Table_addrow>
          </div>
          <br></br>
          <div>
            <Table_addrow table_obj={t1_spex}></Table_addrow>
          </div>
        </div>
      </div>

      <button
        type="button"
        style={{ margin: '20px', width: '120px', borderRadius: '5px', backgroundColor: 'yellow' }}
        onClick={btnStart}
      >
        Start
      </button>
      <button
        type="button"
        style={{ margin: '20px', width: '120px', borderRadius: '5px', backgroundColor: 'goldenrod' }}
        onClick={btnStop}
      >
        Stop
      </button>

      {/* <button
        type="button"
        style={{ margin: '20px' }}
        onClick={btnTest}
      >
        Test hàm
      </button> */}
    </>
  );
};

export default Arbitrage;
