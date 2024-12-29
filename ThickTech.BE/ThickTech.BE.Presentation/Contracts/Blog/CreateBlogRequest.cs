namespace ThickTech.BE.Presentation.Contracts
{
    public sealed record CreateBlogRequest(
        Guid user_id,
        string title,
        string content,
        string images
    );

}
