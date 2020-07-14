class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :user_id
      t.integer :channel_id
      t.string :channel_name
      t.timestamps
    end
    add_index :subscriptions, :user_id
  end
end
