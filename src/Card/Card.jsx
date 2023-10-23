import "./Card.css";

const Card = (props) => {
  const { name, avatarUrl, stars, description, language } = props;
  return (
    <div>
      <div className="card">
        <div className="avatar">
          <img src={avatarUrl} alt="Avatar" />
        </div>
        <div className="name">{name}</div>
        <div className="repository-info">
          <p
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginTop: "10px",
            }}
          >
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Stars:</strong> {stars}
          </p>
          <p>
            <strong>Language:</strong> {language}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
