const categoryModel = require('../db/models/categoryModel');

class CategoryService {
  constructor(Category) {
    this.Category = Category;
  }

  // 카테고리 조회
  async getCategories() {
    return await this.Category.find({});
  }

  async getCategoriesItems(books) {}

  // 카테고리 추가
  async addCategory(categoryInfo) {
    const { category } = categoryInfo;

    // 중복 확인
    const categoryName = await this.Category.findOne({ name: category });
    if (categoryName) {
      throw new Error('이미 있는 카테고리입니다.');
    }
    // db 저장
    return await this.Category.create(categoryInfo);
  }

  // 카테고리 수정 shortId 불가능하면 수정해야 될듯 합니다.
  async setCategory(categoryId, toUpdate) {
    const category = await this.Category.findById({ id: categoryId });
    if (!category) {
      throw new Error('해당 카테고리의 id가 없습니다.');
    }
    // 중복 확인
    const categoryName = await this.Category.findOne({
      name: toUpdate.category,
    });
    if (categoryName) {
      throw new Error('이미 있는 카테고리입니다.');
    }

    return await this.Category.findOneAndUpdate(
      { id: categoryId },
      { toUpdate }
    );
  }

  // 카테고리 삭제
  async deleteCategory(categoryId) {
    let category = await Category.findOneAndDelete({ id: categoryId });
    if (!category) {
      throw new Error('해당 카테고리의 id가 없습니다.');
    }

    return category;
  }
}

const categoryService = new CategoryService(Category);

module.exports = CategoryService;
