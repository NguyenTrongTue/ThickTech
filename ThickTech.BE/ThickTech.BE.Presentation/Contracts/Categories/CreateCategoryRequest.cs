namespace ThickTech.BE.Presentation.Contracts
{
    public sealed record CreateCategoryRequest(
        string category_name,
        string category_slug
        );

}
