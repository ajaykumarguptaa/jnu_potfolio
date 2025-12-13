import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MemberDetail() {
  const { type, id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/members.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        let list =
          type === "current-members"
            ? data.currentMembers
            : type === "alumni"
            ? data.alumni
            : type === "interns"
            ? data.interns
            : [];
        const found = list.find((m) => m.id.toString() === id);
        if (!found) throw new Error("Member not found");
        setMember(found);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [type, id]);

  if (loading) return <div className="text-center py-10 text-lg">Loading…</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Error: {error}
      </div>
    );

  const contact = member.contact || {};
  const interests = member.interests || [];
  const imagePath = `/${encodeURIComponent(member.image || "")}`;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-green-100 flex justify-center items-start py-20 px-4">
      <div className="bg-gradient-to-r from-purple-100 to-green-100 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-300 px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {member.name}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-purple-700 font-semibold px-4 py-1 rounded hover:bg-purple-100 transition"
          >
            ← Back
          </button>
        </div>

        {/* Body */}
        <div className="p-8 md:p-12">
          {/* Profile Image */}
          <div className="flex justify-center mb-10">
            <div className="rounded-full w-48 h-48 md:w-64 md:h-64 border-4 border-purple-300 shadow-xl overflow-hidden">
              <img
                src={imagePath}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Member Details - Vertical Layout with Pre-WhiteSpace */}
          <div className="space-y-6 text-gray-700 text-lg whitespace-pre-line">
            {/* Role */}
            {member.role && (
              <div>
                 <p>{member.about}</p>
                <p className="font-semibold text-purple-700 mb-1">Role:</p>
                <p>{member.role}</p>
              </div>
            )}

            {/* Education */}
            {member.education && (
              <div>
                <p className="font-semibold text-purple-700 mb-1">Education:</p>
                <p>{member.education}</p>
              </div>
            )}

            {/* Research Interests */}
            {interests.length > 0 && (
              <div>
                <p className="font-semibold text-purple-700 mb-1">Research Interests:</p>
                <ul><li>{member.interests}</li></ul>
              </div>
            )}

            {/* Research Work */}
            {member.researchWork && (
              <div>
                <p className="font-semibold text-purple-700 mb-1">Research Work:</p>
                <p>{member.researchWork}</p>
              </div>
            )}

            {/* Contact Info */}
            {!!Object.keys(contact).length && (
              <div>
                <p className="font-semibold text-purple-700 mb-1">Contact:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {contact.address && (
                    <li>
                      <strong>Address:</strong> {contact.address}
                    </li>
                  )}
                  {contact.mobile && (
                    <li>
                      <strong>Mobile:</strong> {contact.mobile}
                    </li>
                  )}
                  {contact.email && (
                    <li>
                      <strong>Email:</strong> {contact.email}
                    </li>
                  )}
                  {contact.Linkedin && (
                    <li>
                      <strong>Linkedin:</strong> <a className="hover:text-purple-300" href="{contact.Linkedin}">{contact.Linkedin}</a>
                    </li>
                  )}
                  {contact.GitHub && (
                    <li>
                      <strong>GitHub:</strong> {contact.GitHub}
                    </li>
                  )}
                  {contact.email && (
                    <li>
                      <strong>Google_Scholar:</strong> {contact.Google_Scholar}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetail;
