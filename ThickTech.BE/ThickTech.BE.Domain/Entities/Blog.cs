using ThickTech.BE.Domain.Primitives;

namespace ThickTech.BE.Domain.Entities;

public sealed class Blog : AggregateRoot, IAuditableEntity
{
    private Blog(Guid id,
        Guid _user_id,
        string _title,
        string _content,
        string _images)
        : base(id)
    {
        user_id = _user_id;
        title = _title;
        content = _content;
        images = _images;
    }

    private Blog()
    {
    }
    public Guid user_id { get; private set; }
    public string title { get; private set; }
    public string content { get; private set; }
    public string images { get; private set; }
    public DateTime created_date { get; set; }
    public DateTime? modified_date { get; set; }
    public User user { get; set; }
    public static Blog Create(
       Guid id,
       Guid user_id, string title,
       string content,
       string images)
    {
        var Blog = new Blog(
            id,
            user_id,
            title,
            content,
            images
            );
        return Blog;
    }
}
