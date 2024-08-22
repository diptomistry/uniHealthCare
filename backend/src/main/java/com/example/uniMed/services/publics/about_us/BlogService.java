package com.example.uniMed.services.publics.about_us;



import com.example.uniMed.models.Blog;
import com.example.uniMed.repositories.publics.about_us.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    public Optional<Blog> updateBlog(Long id, Blog blogDetails) {
        return blogRepository.findById(id).map(blog -> {
            blog.setTitle(blogDetails.getTitle());
            blog.setDescription(blogDetails.getDescription());
            blog.setImage(blogDetails.getImage());
            blog.setBlog(blogDetails.isBlog());
            return blogRepository.save(blog);
        });
    }

    public boolean deleteBlog(Long id) {
        return blogRepository.findById(id).map(blog -> {
            blogRepository.delete(blog);
            return true;
        }).orElse(false);
    }
}