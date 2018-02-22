package shop;

import java.util.HashMap;
import java.util.Map;

import org.springframework.util.Base64Utils;

public class ResponseProduct {
	// Айди продукта
	private int id;
	// Цена
	private double price;
	// Название
	private String title;
	// Описание
	private String description;
	// Изображение в кодировке base64
	private String image;
	// Дополнительная информация
	//private Map<String, String> additionalInfo;
	
	// Конструктор без параметров
	public ResponseProduct() {
		//additionalInfo = new HashMap<String, String>();
	}
	
	// Конструктор копирования
	public ResponseProduct(ProductEntity p) {
		this.id = p.getId();
		this.price = p.getPrice();
		this.title = p.getTitle();
		this.description = p.getDescription();
		this.image = Base64Utils.encodeToString(p.getImage());
//		this.additionalInfo = p.getAdditionalInfo();
	}

	//// Геттеры и сеттеры ////
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
}
