package shop;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;


@Entity
public class ProductEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	// Цена
	private double price;
	// Название
	private String title;
	// Описание
	private String description;
	//private Map<String, String> additionalInfo;
	
	
	// Изображение
	@Lob
	private byte[] image;
	
	// Конструктор
	public ProductEntity() {
		//this.additionalInfo = new HashMap<String, String>();
	}
	
	// Конструктор
	ProductEntity(double price, String title, String description) {
		this.price = price;
		this.title = title;
		this.description = description;
		//this.image = new byte[2];
	}
	
//	public Map<String, String> getAdditionalInfo() {
//		return additionalInfo;
//	}
//
//	public void setAdditionalInfo(Map<String, String> additionalInfo) {
//		this.additionalInfo = additionalInfo;
//	}

	// Конструктор
	ProductEntity(double price, String title) {
		this.price = price;
		this.title = title;
		//this.image = new byte[2];
	}

	//// Геттеры и сеттеры ////
	
	public double getPrice() {
		return price;
	}

	public void setPrice(double priceDollars) {
		this.price = priceDollars;
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
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte[] getImage() {
		return this.image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
}
