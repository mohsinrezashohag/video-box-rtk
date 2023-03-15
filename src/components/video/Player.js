export default function Player({ link }) {
    return (
        <iframe
            width="100%"
            className="aspect-video"
            src={link}
            title="Some video title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}
