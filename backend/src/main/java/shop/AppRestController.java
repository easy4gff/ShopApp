package shop;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Lists;

@CrossOrigin
@RestController
public class AppRestController {

	// Репозиторий с данными
	@Autowired
	private ProductRepository repository;
    
	// Возвращение списка продуктов
    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
    @RequestMapping("/products")
    public List<ResponseProduct> products() {
        List<ProductEntity> products = (List<ProductEntity>) repository.findAll();
        //products = Lists.reverse(products);
        
    	// Штука для того, чтобы операция над стримом кастовалась к List<ProductEntity>
        Supplier<List<ResponseProduct>> supplier = () -> new LinkedList<ResponseProduct>();
        
//        return (List<ResponseProduct>) products.stream().map(((entity) -> new ResponseProduct(entity)))
//        		.collect(Collectors.toList()); 
        
        return products.stream().map(((entity) -> new ResponseProduct(entity)))
        		.collect(Collectors.toCollection(supplier)); 
    }
    
    // Удаление продукта с данным id
    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
    @RequestMapping(value = "/products", method = RequestMethod.DELETE)
    public boolean deleteProduct(@RequestParam(value="id") int id) {
    	repository.delete(id);
    	return true;
    }
    
    // Добавление продукта
    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
    @RequestMapping(value = "/products/add", method = RequestMethod.POST)
    public boolean addProduct(@RequestBody ResponseProduct input) {
    	ProductEntity entity = new ProductEntity(
    				input.getPrice(),
    				input.getTitle(),
    				input.getDescription()
		);
    	//entity.setImage(Base64Utils.decodeFromString(input.getImage()));
    	try {
			entity.setImage(Base64.getDecoder().decode(new String(input.getImage()).getBytes("UTF-8")));
	    	repository.save(entity);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return false;
		}
    
    	return true;
    }
    
    // Инициализация
    @PostConstruct
    public void init() {
    	repository.deleteAll();
    	ProductEntity product1 = new ProductEntity(123, "Some notebook", "A very cool notebook, wow!");
    	ProductEntity product2 = new ProductEntity(42,  "Another one",   "Same here!");
    	ProductEntity product3 = new ProductEntity(99.9,  "Catbook",   "!!!");
    	File image1 = new File("src/main/resources/pictures/download.jpeg");
    	File image2 = new File("src/main/resources/pictures/images.jpeg");
    	File image3 = new File("src/main/resources/pictures/catbook.jpg");
    	try {
			product1.setImage(Files.readAllBytes(image1.toPath()));
	    	repository.save(product1);
	    	product2.setImage(Files.readAllBytes(image2.toPath()));
	    	repository.save(product2);
	    	product3.setImage(Files.readAllBytes(image3.toPath()));
	    	repository.save(product3);
		} catch (IOException e) {
			e.printStackTrace();
		}
    }
}
