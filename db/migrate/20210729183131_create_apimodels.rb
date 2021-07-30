class CreateApimodels < ActiveRecord::Migration[6.1]
  def change
    create_table :apimodels do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
