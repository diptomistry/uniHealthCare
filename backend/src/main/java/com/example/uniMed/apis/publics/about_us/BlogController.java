package com.example.uniMed.apis.publics.about_us;



import com.example.uniMed.models.Blog;
import com.example.uniMed.services.publics.about_us.BlogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        Optional<Blog> blog = blogService.getBlogById(id);
        if (blog.isPresent()) {
            return ResponseEntity.ok(blog.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Blog createBlog(@RequestBody Blog blog,@RequestPart("image") MultipartFile image) {
    
        System.out.println(blog.isBlog());
        System.out.println("Blog object: " + blog);
        System.out.println("isBlog: " + blog.isBlog());

        return blogService.createBlog(blog,image);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog blogDetails) {
        Optional<Blog> updatedBlog = blogService.updateBlog(id, blogDetails);
        if (updatedBlog.isPresent()) {
            return ResponseEntity.ok(updatedBlog.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long id) {
        if (blogService.deleteBlog(id)) {
            return ResponseEntity.ok("Blog deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}