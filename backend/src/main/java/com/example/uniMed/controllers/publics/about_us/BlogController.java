package com.example.uniMed.controllers.publics.about_us;

import com.example.uniMed.models.Blog;
import com.example.uniMed.services.publics.about_us.BlogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Blog> createBlog(
            @RequestPart("title") String title,
            @RequestPart("isBlog") String isBlog,
            @RequestPart("description") String description,
            @RequestPart("isQoute") String isQoute,
            @RequestPart(value = "file", required = false) MultipartFile file) {
                System.out.println("Title: "+title);
                System.out.println("Description: "+description);
                System.out.println("isBlog: "+isBlog);
                System.out.println("isQoute: "+isQoute);
        Blog aBlog = new Blog();
        aBlog.setTitle(title);
        aBlog.setDescription(description);
        if (isBlog.equals("true")) {
            aBlog.setBlog(true);
        } else {
            aBlog.setBlog(false);
        }
        if (isQoute.equals("true")) {
            aBlog.setQoute(true);
        } else {
            aBlog.setQoute(false);
        }

        Blog newBlog = blogService.createBlog(aBlog, file);

        return ResponseEntity.ok(newBlog);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Blog> updateBlog(
            @PathVariable Long id,
            @RequestPart(value = "title",required = false) String title,
            @RequestPart(value = "description",required = false) String description,
            @RequestPart(value = "isBlog",required = false) String isBlog,
            @RequestPart(value = "isQoute",required = false) String isQoute,
            @RequestPart(value = "file", required = false) MultipartFile file) {
                System.out.println("Update blog");
                System.out.println("Title: "+title);
                System.out.println("Description: "+description);
                System.out.println("isBlog: "+isBlog);
                System.out.println("isQoute: "+isQoute);



        Optional<Blog> updatedBlog = blogService.updateBlog(id, title, description, file,isBlog!=null? isBlog.equals("true"):true,isQoute!=null? isQoute.equals("true"):false);
        return updatedBlog.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long id) {
        System.out.println("Delete blog");
        if (blogService.deleteBlog(id)) {
            return ResponseEntity.ok("Blog deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}