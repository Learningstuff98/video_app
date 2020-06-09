class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :description
      t.integer :channel_id
      t.timestamps
    end
    add_index :posts, :channel_id
  end
end
