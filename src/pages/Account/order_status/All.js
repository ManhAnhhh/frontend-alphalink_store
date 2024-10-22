import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOrdersByCustomerID } from "../../../services/Api";
import {
  GetImageProduct,
  capitalizeFirstLetter,
} from "../../../share/utilities";

const All = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const stateOrder = {
    pending: "warning",
    processing: "info",
    shipping: "primary",
    success: "success",
    canceled: "canceled",
  };

  const { id } = useParams();
  useEffect(() => {
    getOrdersByCustomerID(id)
      .then(({ data }) => {
        if (data.data) setOrders(data.data);
      })
      .catch((err) => {});
  }, [id]);
  // console.log(orders);
  const isCancellBtn = useMemo(() => ["pending", "processing"], []);

  return (
    <div id="all-purchase">
      <div className="list-order-items">
        {orders.length !== 0 &&
          orders.map((order) => {
            return (
              <div key={order._id} className="item table-responsive">
                <div className="text-end">
                  {isCancellBtn.includes(order.status.toLowerCase()) && (
                    <div className="cancel-state-item m-2 d-inline-block btn btn-outline-danger">
                      Cancel
                    </div>
                  )}

                  <div
                    className={`state-item d-inline-block btn btn-${
                      stateOrder[order.status]
                    } my-2 text-white`}
                  >
                    {capitalizeFirstLetter(order.status)}
                  </div>
                </div>
                <table>
                  <tbody>
                    {order.items.map((item, index) => {
                      return (
                        <tr
                          key={Date.now() + index}
                          className="border-bottom boder-1"
                        >
                          <td className="item-img">
                            <img
                              src={GetImageProduct(item.img)}
                              alt={GetImageProduct(item.img)}
                            />
                          </td>
                          <td>
                            <div
                              className="mb-2 fw-bold item-name"
                              onClick={() =>
                                navigate(`/product-detail/${item.prd_id}`)
                              }
                            >
                              {item.name}
                            </div>
                            <div className="d-flex gap-4">
                              <div className="fs-14">
                                Quantity:
                                <span className="ms-1 text-danger fw-bold">
                                  {item.qty}
                                </span>
                              </div>
                              <div className="fs-14">
                                Color:
                                <span className="ms-1 fw-bold">
                                  {item.color}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="ms-1 text-end text-danger fw-bold text-nowrap">
                            $ {item.price}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      {order.note && (
                        <td className="text-nowrap">Note: {order.note}</td>
                      )}
                      <td colSpan={order.note ? 2 : 3} className="text-end">
                        Voucher:
                        <span className="ms-1 text-danger fw-bold">$ 0</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-end">
                        Shipping fee:
                        <span className="ms-1 text-danger fw-bold">
                          $ {order.items.length > 3 ? 0 : 15}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-end">
                        Total:
                        <span
                          className="ms-1 text-danger fw-bold"
                          style={{ fontSize: "21px" }}
                        >
                          $ {order.totalPrice}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn-custom py-1 my-2">Repuchase</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default All;

// <div className="item table-responsive">
//           <div className="text-end">
//             <div className="cancel-state-item m-2 d-inline-block btn btn-outline-danger">
//               Cancel
//             </div>
//             <div className="state-item my-2 d-inline-block btn btn-info text-white">
//               Processing
//             </div>
//           </div>
//           <table>
//             <tbody>
//               <tr className="border-bottom boder-1">
//                 <td className="item-img">
//                   <img src="/img/products/acer1_1.jpg" alt="true" />
//                 </td>
//                 <td>
//                   <div className="mb-2">
//                     Acer Aspire 3 A314-23P-R3QA Slim Laptop
//                   </div>
//                   <div className="d-flex gap-4">
//                     <div className="fs-14">
//                       Quantity:{" "}
//                       <span className="ms-1 text-danger fw-bold">1</span>
//                     </div>
//                     <div className="fs-14">
//                       Color: <span className="fw-bold">Black</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="ms-1 text-end text-danger fw-bold text-nowrap">
//                   $ 400
//                 </td>
//               </tr>
//               <tr className="border-bottom boder-1">
//                 <td className="item-img">
//                   <img src="/img/products/acer1_1.jpg" alt="true" />
//                 </td>
//                 <td>
//                   <div className="mb-2">
//                     Acer Aspire 3 A314-23P-R3QA Slim Laptop
//                   </div>
//                   <div className="d-flex gap-4">
//                     <div className="fs-14">
//                       Quantity:{" "}
//                       <span className="ms-1 text-danger fw-bold">1</span>
//                     </div>
//                     <div className="fs-14">
//                       Color: <span className="fw-bold">Black</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="ms-1 text-end text-danger fw-bold text-nowrap">
//                   $ 400
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={3} className="text-end">
//                   Total:{" "}
//                   <span
//                     className="text-danger fw-bold"
//                     style={{ fontSize: "21px" }}
//                   >
//                     $ 800
//                   </span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <button className="btn-custom py-1 my-2">Repuchase</button>
//         </div>
//         <div className="item table-responsive">
//           <div className="text-end">
//             <div className="state-item my-2 d-inline-block btn btn-primary text-white">
//               Shipping
//             </div>
//           </div>
//           <table>
//             <tbody>
//               <tr className="border-bottom boder-1">
//                 <td className="item-img">
//                   <img src="/img/products/acer1_1.jpg" alt="true" />
//                 </td>
//                 <td>
//                   <div className="mb-2">
//                     Acer Aspire 3 A314-23P-R3QA Slim Laptop
//                   </div>
//                   <div className="d-flex gap-4">
//                     <div className="fs-14">
//                       Quantity:{" "}
//                       <span className="ms-1 text-danger fw-bold">1</span>
//                     </div>
//                     <div className="fs-14">
//                       Color: <span className="fw-bold">Black</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="ms-1 text-end text-danger fw-bold text-nowrap">
//                   $ 400
//                 </td>
//               </tr>
//               <tr className="border-bottom boder-1">
//                 <td className="item-img">
//                   <img src="/img/products/acer1_1.jpg" alt="true" />
//                 </td>
//                 <td>
//                   <div className="mb-2">
//                     Acer Aspire 3 A314-23P-R3QA Slim Laptop
//                   </div>
//                   <div className="d-flex gap-4">
//                     <div className="fs-14">
//                       Quantity:{" "}
//                       <span className="ms-1 text-danger fw-bold">1</span>
//                     </div>
//                     <div className="fs-14">
//                       Color: <span className="fw-bold">Black</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="ms-1 text-end text-danger fw-bold text-nowrap">
//                   $ 400
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={3} className="text-end">
//                   Total:{" "}
//                   <span
//                     className="text-danger fw-bold"
//                     style={{ fontSize: "21px" }}
//                   >
//                     $ 800
//                   </span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <button className="btn-custom py-1 my-2">Repuchase</button>
//         </div>
//         <div className="item table-responsive">
//           <div className="text-end">
//             <div className="state-item my-2 d-inline-block btn btn-success text-white">
//               Success
//             </div>
//           </div>
//           <table>
//             <tbody>
//               <tr className="border-bottom boder-1">
//                 <td className="item-img">
//                   <img src="/img/products/acer1_1.jpg" alt="true" />
//                 </td>
//                 <td>
//                   <div className="mb-2">
//                     Acer Aspire 3 A314-23P-R3QA Slim Laptop
//                   </div>
//                   <div className="d-flex gap-4">
//                     <div className="fs-14">
//                       Quantity:{" "}
//                       <span className="ms-1 text-danger fw-bold">1</span>
//                     </div>
//                     <div className="fs-14">
//                       Color: <span className="fw-bold">Black</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="ms-1 text-end text-danger fw-bold text-nowrap">
//                   $ 400
//                 </td>
//               </tr>
//               <tr className="border-bottom boder-1">
//                 <td className="item-img">
//                   <img src="/img/products/acer1_1.jpg" alt="true" />
//                 </td>
//                 <td>
//                   <div className="mb-2">
//                     Acer Aspire 3 A314-23P-R3QA Slim Laptop
//                   </div>
//                   <div className="d-flex gap-4">
//                     <div className="fs-14">
//                       Quantity:{" "}
//                       <span className="ms-1 text-danger fw-bold">1</span>
//                     </div>
//                     <div className="fs-14">
//                       Color: <span className="fw-bold">Black</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="ms-1 text-end text-danger fw-bold text-nowrap">
//                   $ 400
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={3} className="text-end">
//                   Total:{" "}
//                   <span
//                     className="text-danger fw-bold"
//                     style={{ fontSize: "21px" }}
//                   >
//                     $ 800
//                   </span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <button className="btn-custom py-1 my-2">Repuchase</button>
//         </div>
//         <div className="item table-responsive">
//           <div className="text-end">
//             <div className="state-item my-2 d-inline-block btn btn-danger text-white">
//               Canceled
//             </div>
//           </div>
//           <table>
//             <tbody>
//               <tr className="border-bottom boder-1">
//                 <td className="item-img">
//                   <img src="/img/products/acer1_1.jpg" alt="true" />
//                 </td>
//                 <td>
//                   <div className="mb-2">
//                     Acer Aspire 3 A314-23P-R3QA Slim Laptop
//                   </div>
//                   <div className="d-flex gap-4">
//                     <div className="fs-14">
//                       Quantity:{" "}
//                       <span className="ms-1 text-danger fw-bold">1</span>
//                     </div>
//                     <div className="fs-14">
//                       Color: <span className="fw-bold">Black</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="ms-1 text-end text-danger fw-bold text-nowrap">
//                   $ 400
//                 </td>
//               </tr>
//               <tr className="border-bottom boder-1">
//                 <td className="item-img">
//                   <img src="/img/products/acer1_1.jpg" alt="true" />
//                 </td>
//                 <td>
//                   <div className="mb-2">
//                     Acer Aspire 3 A314-23P-R3QA Slim Laptop
//                   </div>
//                   <div className="d-flex gap-4">
//                     <div className="fs-14">
//                       Quantity:{" "}
//                       <span className="ms-1 text-danger fw-bold">1</span>
//                     </div>
//                     <div className="fs-14">
//                       Color: <span className="fw-bold">Black</span>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="ms-1 text-end text-danger fw-bold text-nowrap">
//                   $ 400
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={3} className="text-end">
//                   Total:{" "}
//                   <span
//                     className="text-danger fw-bold"
//                     style={{ fontSize: "21px" }}
//                   >
//                     $ 800
//                   </span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <div className="d-flex justify-content-between align-items-center">
//             <button className="btn-custom py-1 my-2">Repuchase</button>
//             <div className="fs-14 text-danger">Cancelled by you</div>
//             {/* <div className="fs-14 text-danger">Cancelled by seller</div>  */}
//           </div>
//         </div>
