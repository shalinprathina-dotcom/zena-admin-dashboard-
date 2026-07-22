import React, { useEffect, useMemo, useState } from "react";
import { deleteChatSession, getChatHistory } from "./api";
import Swal from "sweetalert2";

function getMessageText(message) {
  return message.message || "-";
}

function ChatHistory() {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const result = await getChatHistory();

      if (!result.success) {
        throw new Error(
          result.message || "Failed to fetch chat history"
        );
      }

      const groupedSessions = {};

      (result.chat_history || []).forEach((message) => {
        const sessionId = message.session_id;

        if (!groupedSessions[sessionId]) {
          groupedSessions[sessionId] = {
            session_id: sessionId,
            messages: [],
            message_count: 0,
            last_message_at: message.created_at,
          };
        }

        groupedSessions[sessionId].messages.push(message);
        groupedSessions[sessionId].message_count += 1;

        groupedSessions[sessionId].last_message_at =
          message.created_at;
      });


      setSessions(
        Object.values(groupedSessions)
      );

      setError("");

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  const filteredSessions = useMemo(() => {

    const query = search
      .trim()
      .toLowerCase();


    if (!query) return sessions;


    return sessions.filter((session) => {

      const sessionMatch =
        session.session_id
          ?.toLowerCase()
          .includes(query);


      const messageMatch =
        session.messages.some((msg) =>
          msg.message
            ?.toLowerCase()
            .includes(query)
        );


      return sessionMatch || messageMatch;

    });

  }, [sessions, search]);



  const handleDelete = async (sessionId) => {

    const result = await Swal.fire({
      title: "Delete Conversation?",
      text: "This entire chat session will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });


    if (!result.isConfirmed) return;


    try {

      const response =
        await deleteChatSession(sessionId);


      if (!response.success) {
        throw new Error(response.message);
      }


      setSessions((prev) =>
        prev.filter(
          (item) =>
            item.session_id !== sessionId
        )
      );


      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1500,
        showConfirmButton: false,
      });


    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          err.message ||
          "Failed to delete conversation.",
      });

    }
  };



  if (loading) {
    return (
      <div className="state-box">
        Loading chat history...
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



  return (

    <div className="page-content">

      <div className="panel-card">


        <div className="panel-header">

          <h2>
            Chat History
          </h2>


          <input
            type="text"
            placeholder="Search Session ID or Message..."
            className="search-input"
            value={search}
            onChange={(e)=>
              setSearch(e.target.value)
            }
          />

        </div>



        {
          filteredSessions.length === 0 ?

          (

            <div className="empty-state">
              No conversations found.
            </div>

          )

          :

          (

          <div className="chat-session-list">


          {
            filteredSessions.map((session)=>(


              <article
                key={session.session_id}
                className="chat-session-card"
              >


                <div className="chat-session-header">


                  <div>

                    <h3>
                      Session:
                      {" "}
                      {session.session_id}
                    </h3>


                    <p>
                      Messages:
                      {" "}
                      {session.message_count}
                    </p>


                    <p>

                      Last Activity:
                      {" "}

                      {
                        new Date(
                          session.last_message_at
                        ).toLocaleString()
                      }

                    </p>


                  </div>



                  <button
                    className="danger-button"
                    onClick={() =>
                      handleDelete(
                        session.session_id
                      )
                    }
                  >
                    Delete Session
                  </button>


                </div>




                <div className="conversation-thread">


                {
                  session.messages.map(
                    (message)=>(
                    
                    <div
                      key={message.id}
                      className="conversation-item"
                    >

                      <p>

                        <strong>
                          {
                            message.sender === "user"
                            ? "User"
                            : "Bot"
                          }
                          :
                        </strong>

                        {" "}

                        {getMessageText(message)}

                      </p>


                      <small>

                        {
                          message.created_at
                          ?
                          new Date(
                            message.created_at
                          ).toLocaleString()
                          :
                          "-"
                        }

                      </small>


                    </div>

                  ))

                }


                </div>


              </article>


            ))

          }


          </div>

          )

        }


      </div>

    </div>

  );
}


export default ChatHistory;