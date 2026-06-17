import { useEffect, useState } from "react";

function UserProfile() {
  const [memory, setMemory] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/memory")
      .then((res) => res.json())
      .then((data) => setMemory(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        USER PROFILE
      </h2>
      <div className="space-y-2 text-cyan-300">
  {Object.keys(memory).length === 0 ? (
    <p>No memory stored.</p>
  ) : (
    Object.entries(memory).map(([key, value]) => (
      <p key={key}>
        <span className="text-cyan-500">
          {key
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
            )
            .join(" ")}
          :
        </span>{" "}
        {value}
      </p>
    ))
  )}
</div>

<div className="mt-4 text-xs text-cyan-500">
  MEMORY STATUS: ACTIVE
</div>

</div>
);
}

export default UserProfile;