import React, { useEffect, useState } from "react";
import { getDashboardData } from "./api";

function DashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const result = await getDashboardData();

        if (!result.success) {
          throw new Error(
            result.message || "Failed to load dashboard data"
          );
        }

        setData(result);

      } catch (fetchError) {
        setError(fetchError.message);

      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

  }, []);


  if (loading) {
    return (
      <div className="state-box">
        Loading dashboard data...
      </div>
    );
  }


  if (error) {
    return (
      <div className="state-box error-state">
        Error: {error}
      </div>
    );
  }


  // Backend response:
  // {
  //   success:true,
  //   data:{
  //      total_contacts:1,
  //      total_chats:10
  //   }
  // }

  const stats = {
    total_contact_requests:
      data?.data?.total_contacts || 0,

    total_conversations:
      data?.data?.total_chats || 0,

    recent_users:
      data?.data?.total_contacts || 0,

    latest_activity:
      data?.data?.total_chats || 0,
  };


  return (
    <div className="page-content">


      <div className="stats-grid">


        <div className="stat-card">
          <h3>
            Total Contact Requests
          </h3>

          <p>
            {stats.total_contact_requests}
          </p>
        </div>



        <div className="stat-card">
          <h3>
            Total Conversations
          </h3>

          <p>
            {stats.total_conversations}
          </p>
        </div>



        <div className="stat-card">
          <h3>
            Recent Users
          </h3>

          <p>
            {stats.recent_users}
          </p>
        </div>



        <div className="stat-card">
          <h3>
            Latest Activity
          </h3>

          <p>
            {stats.latest_activity}
          </p>
        </div>


      </div>



      <div className="panel-grid">


        <section className="panel-card">

          <h2>
            Dashboard Status
          </h2>


          <ul className="list-view">

            <li>
              <strong>
                Supabase Connection
              </strong>

              <span>
                Active
              </span>
            </li>


            <li>
              <strong>
                Chatbot Database
              </strong>

              <span>
                Connected
              </span>
            </li>


            <li>
              <strong>
                Contact Requests
              </strong>

              <span>
                {stats.total_contact_requests}
                {" "}
                Records
              </span>
            </li>


            <li>
              <strong>
                Chat History
              </strong>

              <span>
                {stats.total_conversations}
                {" "}
                Messages
              </span>
            </li>


          </ul>


        </section>



        <section className="panel-card">


          <h2>
            Quick Summary
          </h2>


          <p>
            AI Gen Chatbot and Admin Dashboard
            are connected successfully.
          </p>


          <p>
            Real-time data is fetched from
            Supabase database.
          </p>


        </section>


      </div>


    </div>
  );
}


export default DashboardHome;