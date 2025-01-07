package com.example.uniMed.services.publics.about_us;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.uniMed.models.Blog;
import com.example.uniMed.repositories.publics.about_us.BlogRepository;
import com.example.uniMed.services.file.FileService;

@Service
public class BlogService {
    @Autowired
    private FileService fileService;
    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public Blog createBlog(Blog blog,MultipartFile image) {
        try {
            String fileName = fileService.saveFile(image);
            blog.setImage(fileName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return blogRepository.save(blog);
    }

   
    public Optional<Blog> updateBlog(Long id, String title, String description, MultipartFile image, boolean isBlog, boolean isQoute) {
        return blogRepository.findById(id).map(blog -> {
            if (isBlog) {
                blog.setBlog(true);
            } else {
                blog.setBlog(false);
            }
            if (isQoute) {
                blog.setQoute(true);
            } else {
                blog.setQoute(false);
            }
            if (title != null)
          {  blog.setTitle(title);}
          if (description != null)
          {  blog.setDescription(description);}

            if (image != null && !image.isEmpty()) {
               
                
                try {
                    
                    if (blog.getImage() != null) {
                        fileService.deleteFile(blog.getImage());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                try {
                String fileName = fileService.saveFile(image);
                    blog.setImage(fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            return blogRepository.save(blog);
        });
    }

    public boolean deleteBlog(Long id) {
        return blogRepository.findById(id).map(blog -> {
            try {
                if (blog.getImage() != null) {
                    fileService.deleteFile(blog.getImage());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            blogRepository.delete(blog);
            return true;
        }).orElse(false);
    }
}