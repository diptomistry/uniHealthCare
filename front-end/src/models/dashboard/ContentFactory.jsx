// contentFactory.js
class ContentItem {
    constructor(title, description, image, isBlog, isQuote) {
      this.title = title;
      this.description = description;
      this.image = image;
      this.isBlog = isBlog;
      this.isQuote = isQuote;
    }
  
    async createFormData() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("isBlog", String(this.isBlog));
      formData.append("isQoute", String(this.isQuote)); // Fixed typo in isQuote
  
      console.log('Content Properties:', {
        title: this.title,
        description: this.description,
        isBlog: this.isBlog,
        isQuote: this.isQuote,
        imageType: typeof this.image
      });
  
      if (this.image) {
        console.log('Image type:', typeof this.image);
        console.log('Image instanceof File:', this.image instanceof File);
        console.log('Image instanceof Blob:', this.image instanceof Blob);
        
        if (typeof this.image === "string" && this.image.startsWith("data:image")) {
          console.log('Processing base64 image');
          const response = await fetch(this.image);
          const blob = await response.blob();
          formData.append("file", blob, "image.jpg");
        } else if (this.image instanceof File || this.image instanceof Blob) {
          console.log('Processing File/Blob image');
          formData.append("file", this.image);
        }
      }
  
      // Log FormData contents
      for (let pair of formData.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
      }
  
      return formData;
    }
  }
  
  // Rest of the factory classes remain the same
  class BlogContent extends ContentItem {
    constructor(title, description, image) {
      super(title, description, image, true, false);
    }
  }
  
  class ServiceContent extends ContentItem {
    constructor(title, description, image) {
      super(title, description, image, false, false);
    }
  }
  
  class QuoteContent extends ContentItem {
    constructor(title, description, image) {
      super(title, description, image, false, true);
    }
  }
  
  class ContentFactory {
    createContent(type, title, description, image) {
      console.log('Creating content of type:', type);
      console.log('Content details:', { title, description, imagePresent: !!image });
      
      switch (type.toLowerCase()) {
        case 'blog':
          return new BlogContent(title, description, image);
        case 'service':
          return new ServiceContent(title, description, image);
        case 'quote':
          return new QuoteContent(title, description, image);
        default:
          throw new Error(`Invalid content type: ${type}`);
      }
    }
  }
  
  export default ContentFactory;