class CreateOpenings < ActiveRecord::Migration[5.2]
  def change
    create_table :openings do |t|
      t.boolean :success

      t.timestamps
    end
  end
end
